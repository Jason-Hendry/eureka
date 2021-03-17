import AWS from "aws-sdk";
import {SiteSettingsCollection} from "./DirectService";
import {Credentials} from "aws-sdk/clients/sts";

export const credentials = new AWS.Credentials(
    process.env.RAIN_AWS_ACCESS_KEY_ID || '',
    process.env.RAIN_AWS_SECRET_ACCESS_KEY || ''
);

export const s3 = (stsCredentials: Credentials) => new AWS.S3({region: "ap-southeast-2", credentials: new AWS.Credentials(stsCredentials.AccessKeyId, stsCredentials.SecretAccessKey, stsCredentials.SessionToken)});

export const ses = new AWS.SES({region: "ap-southeast-2", credentials});
const sts = new AWS.STS({region: "ap-southeast-2", credentials});

function awsCredentialsAreValid(awsCredentials: Credentials | undefined):boolean  {
    if(!awsCredentials) {
        return false
    }
    if(awsCredentials.Expiration instanceof Date) {
       return awsCredentials.Expiration.getSeconds() >= (new Date).getSeconds()
    }
    return false
}

export async function getCredential(secret: string): Promise<Credentials> {

    return new Promise((resolve, reject) => {
        SiteSettingsCollection(secret).get(process.env.SITE_SETTINGS_ID || '').then(r => {
            console.log("AWS Expiry: ", r.data.awsCredentials)
            if (awsCredentialsAreValid(r.data?.awsCredentials)) {
                resolve(r.data.awsCredentials)
            }
            sts.getSessionToken({
                DurationSeconds: 86400 // 24 hrs
            }, (err, data) => {
                if (data?.Credentials) {
                    console.log(data.Credentials)
                    if (process.env.SITE_SETTINGS_ID) {
                        SiteSettingsCollection(secret).put({
                            ...r,
                            awsCredentials: data.Credentials
                        }, process.env.SITE_SETTINGS_ID)
                    }
                    resolve(data.Credentials)
                }
                reject({error: err})
            })
        })
    })
}

export function AWSService(secret: string): Promise<Credentials> {
    const action = "aws-credentials"
    return fetch("/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({secret, action})
    })
        .then(res => <Credentials><unknown>res.json())

}

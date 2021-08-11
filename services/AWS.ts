import AWS from "aws-sdk";
import {SiteSettingsCollection} from "./DirectService";
import {Credentials} from "aws-sdk/clients/sts";
import {AWSCredentials, fromAWSCredentials, toAWSCredentials} from "./Login";

export const credentials = new AWS.Credentials(
    process.env.RAIN_AWS_ACCESS_KEY_ID || '',
    process.env.RAIN_AWS_SECRET_ACCESS_KEY || ''
);

export const s3 = (stsCredentials: Credentials) => new AWS.S3({region: "ap-southeast-2", credentials: new AWS.Credentials(stsCredentials.AccessKeyId, stsCredentials.SecretAccessKey, stsCredentials.SessionToken)});

export const ses = new AWS.SES({region: "ap-southeast-2", credentials});
const sts = new AWS.STS({region: "ap-southeast-2", credentials});

function awsCredentialsAreValid(awsCredentials: Credentials | undefined):awsCredentials is Credentials  {
    if(!awsCredentials) {
        return false
    }
    return awsCredentials.Expiration.getSeconds() >= (new Date).getSeconds()
}

export async function getCredential(secret: string): Promise<AWSCredentials> {

    return new Promise((resolve, reject) => {
        SiteSettingsCollection(secret).get(process.env.SITE_SETTINGS_ID_AWS_SECRET || '').then(r => {
            console.log("AWS Expiry: ", r?.data?.awsCredentials)
            if (r?.data?.awsCredentials && awsCredentialsAreValid(fromAWSCredentials(r.data.awsCredentials))) {
                resolve(r.data.awsCredentials)
            }
            sts.getSessionToken({
                DurationSeconds: 86400 // 24 hrs
            }, (err, data) => {
                if (data?.Credentials) {
                    console.log(data.Credentials)
                    if (process.env.SITE_SETTINGS_ID_AWS_SECRET) {
                        SiteSettingsCollection(secret).put({
                            ...r.data,
                            awsCredentials: toAWSCredentials(data.Credentials)
                        }, process.env.SITE_SETTINGS_ID_AWS_SECRET)
                    }
                    resolve(toAWSCredentials(data.Credentials))
                }
                reject({error: err})
            })
        })
    })
}

export function AWSService(secret: string): Promise<AWSCredentials> {
    const action = "aws-credentials"
    return fetch("/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({secret, action})
    })
        .then(res => <AWSCredentials><unknown>res.json())

}

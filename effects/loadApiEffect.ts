import {CollectionAPI} from "../services/APIService";
import {useContext, useEffect, useState} from "react";
import {BaseList} from "../models/base";
import {Secret} from "../layout/Admin/Secret";
import {AWSService, s3} from "../services/AWS";
import {Body} from "aws-sdk/clients/s3";
import {AWSCredentials, fromAWSCredentials} from "../services/Login";


export function useAdminListHooks<T>(collection: (secret: string) => CollectionAPI<T>) {
    const secret = useContext(Secret)
    const [list, setList] = useState<BaseList<T>>([])

    // const year = (new Date()).getFullYear();

    useEffect(() => {
        collection(secret).list().then(setList)
    }, [secret])

    return {
        list,
        setList,
        secret
    }
}

type s3UploadReturn = {
    s3Upload: (body: Body, key: string, bucket: string) => Promise<{filename: string}>
    uploading?: boolean
}
export function useS3Upload(): s3UploadReturn {
    const secret = useContext(Secret)
    const [awsCredentials, setAwsCredentials] = useState<AWSCredentials|null>()
    const [uploading, setUploading] = useState<boolean>()
    useEffect(() => {
        AWSService(secret).then((c) => {
            console.log(c)
            setAwsCredentials(c)
        })
    }, [secret])

    const s3Upload = (body: Body, key: string, bucket: string): Promise<{filename: string}> => {
        return new Promise<{filename: string}>((resolve, reject) => {
            if(awsCredentials && bucket) {
                setUploading(true)
                console.log(`Uploadings s3://${bucket}/${key} ${awsCredentials?.AccessKeyId}`)
                s3(fromAWSCredentials(awsCredentials)).putObject({
                    Body: body,
                    Key: key,
                    Bucket: bucket,
                    ACL: "public-read",
                    ContentDisposition: "inline"
                }, (e) => {
                    setUploading(false)
                    console.log(`Uploaded https://images.eurekacycling.org.au/${key}`)
                    if(e) {
                        reject(e)
                    }
                    resolve({filename: `https://images.eurekacycling.org.au/${key}`})
                })
            }
        })
    }

    return {
        s3Upload,
        uploading
    }

}

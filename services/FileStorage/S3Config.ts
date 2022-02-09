import {InvalidCredentialsException, PutFile, StorageConfig} from "./FileStorage";
import {s3} from "../AWS";
import {AWSCredentials, fromAWSCredentials} from "../Login";


export class S3Config implements StorageConfig {

    private readonly awsCredentials: AWSCredentials
    private readonly bucket: string

    constructor(awsCredentials: AWSCredentials, bucket: string) {
        this.awsCredentials = awsCredentials;
        this.bucket = bucket
    }

    private PutObject(file: PutFile) {
        const {awsCredentials, bucket} = this
        return new Promise<{ filename: string }>((resolve, reject) => {
            console.log({cred: fromAWSCredentials(awsCredentials), file})
            s3(fromAWSCredentials(awsCredentials)).putObject({
                Body: file.body,
                Key: file.filepath,
                Bucket: bucket,
                ACL: "public-read",
                ContentDisposition: "inline"
            }, (e) => {
                console.log(`Uploaded https://${bucket}/${file.filepath}`)
                if (e) {
                    console.warn(e)
                    if (e.code === "InvalidClientTokenId") {
                        throw new InvalidCredentialsException()
                    }
                    return reject(e)
                }
                resolve({filename: `https://${bucket}/${file.filepath}`})
            })
        })
    }

    GetClient() {
        return {PutObject: this.PutObject.bind(this)}
    }
}
import {useAWSCredentials} from "./useAWSCredentials";
import {S3Config} from "../services/FileStorage/S3Config";
import {StorageConfig} from "../services/FileStorage/FileStorage";

export const useS3StorageConfiguration = (secret: string, bucket: string): StorageConfig|null => {
    const awsCredentials = useAWSCredentials(secret)
    if(!awsCredentials) {
        return null
    }
    return new S3Config(awsCredentials, bucket)
}
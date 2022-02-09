import {useLocalStorage} from "./UseLocalStorage";
import {AWSCredentials} from "../services/Login";
import {useEffect} from "react";
import {AWSService} from "../services/AWS";

export const useAWSCredentials = (secret: string) => {
    const [awsCredentials, setAwsCredentials] = useLocalStorage<AWSCredentials|null>("awsCredentials", null)
    useEffect(() => {
        console.log({awsCredentials, secret})
        if(secret && (!awsCredentials || awsCredentials.Expiration < new Date().getTime())) {
            AWSService(secret).then(setAwsCredentials).catch(() => {
                throw new UseAWSCredentialsUnavailable()
            })
        }
    }, [secret, awsCredentials])
    return awsCredentials
}

export class UseAWSCredentialsUnavailable extends Error {

}
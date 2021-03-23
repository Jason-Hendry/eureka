import {Credentials} from "aws-sdk/clients/sts";

export interface LoginResponse {
    secret: string
    Credentials: AWSCredentials
}

export interface AWSCredentials {
    AccessKeyId: string,
    SecretAccessKey: string,
    SessionToken: string,
    Expiration: number,
}

export const toAWSCredentials = (c: Credentials): AWSCredentials => {
    return {...c, Expiration: c.Expiration.getTime()}
}
export const fromAWSCredentials = (c: AWSCredentials): Credentials => {
    return {...c, Expiration: new Date(c.Expiration)}
}



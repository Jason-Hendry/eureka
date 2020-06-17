export interface LoginResponse {
    secret: string
    Credentials: AWSCredentials
}
export interface AWSCredentials {
    AccessKeyId: string,
    SecretAccessKey: string,
    SessionToken: string,
    Expiration: string,
}

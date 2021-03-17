import {ses} from "./AWS";
import {AWSError} from "aws-sdk/lib/error";
import {SendEmailResponse} from "aws-sdk/clients/ses";

export const sendEmail = (email: string, subject: string, htmlBody: string, callback: (arg: unknown)=>void) => {
    ses.sendEmail({
        Source: "website@eurekacycling.org.au",
        Destination: {ToAddresses: [email]},
        Message: {
            Body: {Html: {Data: htmlBody}},
            Subject: {Data: subject}
        }
    }, (err: AWSError, data: SendEmailResponse) => {
        console.log('Error: ', err)
        console.log('Data: ', data)
        callback({"email-sent": data?.MessageId || err})
    })
}

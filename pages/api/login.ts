import {NextApiRequest, NextApiResponse} from "next";
import {doReset, doResetRequest} from "../../auth/reset";
import {doLogin} from "../../auth/login";
import {client} from "../../services/faunadb";
import absoluteUrl from "next-absolute-url/index";
import {getCredential} from "../../services/AWS";

interface LoginRequest  extends NextApiRequest {
    body: {
        password: string
        email: string,
    }
}
interface ResetRequestRequest  extends NextApiRequest {
    body: {
        email: string,
        action: "reset-request"
    }
}
const isResetRequestRequest = (request: allActions): request is ResetRequestRequest => {
    return (request as ResetRequestRequest).body?.action === 'reset-request';
}
interface ResetRequest  extends NextApiRequest {
    body: {
        email: string,
        password: string
        hash: string
        action: "reset"
    }
}
const isResetRequest = (request: allActions): request is ResetRequest => {
    return (request as ResetRequest).body?.action  === 'reset';
}
interface AWSCredentialsRequest extends NextApiRequest {
    body: {
        action: "aws-credentials"
        secret: string
    }
}
const isAWSCredentialsRequest = (request: allActions): request is AWSCredentialsRequest => {
    return (request as AWSCredentialsRequest).body?.action  === 'aws-credentials';
}

type allActions = LoginRequest|ResetRequestRequest|ResetRequest|AWSCredentialsRequest;

const error500 = (res: NextApiResponse) => {
    return (e: unknown) => {
        res.status(500);
        res.json(e)
    }
}

export const LoginAPI = (req: allActions, res: NextApiResponse): void => {
    if(isResetRequest(req)) {
        doReset(client, req.body.email , req.body.password , req.body.hash).then(res.json).catch(error500(res))
    }
    else if(isResetRequestRequest(req)) {
        doResetRequest(client, req.body.email, absoluteUrl(req)).then(res.json).catch(error500(res))
    }
    else if(isAWSCredentialsRequest(req)) {
        getCredential(req.body.secret).then(res.json).catch(error500(res))
    }
    else {
        doLogin(client, req.body.email, req.body.password).then(res.json).catch(error500(res));
    }
}
export default LoginAPI
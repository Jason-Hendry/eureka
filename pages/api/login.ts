import {IncomingMessage, ServerResponse} from "http";
import {Interface} from "readline";
import btoa from "btoa"
import React from "react";
import {LoginResponse} from "../../services/Login";
import {Client} from "faunadb";
import {ExprArg} from "faunadb/src/types/query";
import {User} from "../../models/User";
import {NextApiRequest, NextApiResponse} from "next";
import absoluteUrl from 'next-absolute-url'
import {AWSError} from "aws-sdk/lib/error";
import {SendEmailResponse} from "aws-sdk/clients/ses";

const faunadb = require('faunadb')
const q = faunadb.query

const crypto = require('crypto');


export function LoginService(email, password, callback, error) {
    const action = "login"
    fetch("/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, action})
    })
        .then(res => <LoginResponse><unknown>res.json())
        .then(({secret, Credentials}) => callback(secret, Credentials))
        .catch(error => error(error))
}

export function ResetService(hash, password, callback, error) {
    const action = "reset"
    fetch("/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({hash, password, action})
    })
        .then(res => <LoginResponse><unknown>res.json())
        .then(({secret, Credentials}) => callback(secret, Credentials))
        .catch(error => error(error))
}

export function ResetRequestService(email, callback, error) {
    const action = "reset-request"
    fetch("/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, action})
    })
        .then(res => <LoginResponse><unknown>res.json())
        .then(({secret, Credentials}) => callback(secret, Credentials))
        .catch(error => error(error))
}

const AWS = require("aws-sdk");
const sts = new AWS.STS({region: "ap-southeast-2", credentials: new AWS.Credentials(process.env.RAIN_AWS_ACCESS_KEY_ID, process.env.RAIN_AWS_SECRET_ACCESS_KEY)});
const ses = new AWS.SES({region: "ap-southeast-2", credentials: new AWS.Credentials(process.env.RAIN_AWS_ACCESS_KEY_ID, process.env.RAIN_AWS_SECRET_ACCESS_KEY)});

interface LoginMatch {
    instance: ExprArg
    secret: string
}

function doLogin(client: Client, email: string, password: string, res: NextApiResponse) {
    client.query<LoginMatch>(
        q.Login(
            q.Match(q.Index('users_by_email'), email),
            {password}
        )
    ).then(({instance, secret}) => {
        client.query<User>(q.Get(instance)).then(({data}) => {
            AWS.config.credentials = new AWS.Credentials(process.env.RAIN_AWS_ACCESS_KEY_ID, process.env.RAIN_AWS_SECRET_ACCESS_KEY)
            sts.getSessionToken({
                DurationSeconds: 86400, // 24hrs
            }, (e, {Credentials}) => res.json({Credentials, secret}))
        })
            .catch(error => {
                res.json({error: error})
            })
        // res.json({instance})
    }).catch((error) => {
        res.json({error: error})
    })
}

function doResetRequest(client: Client, email: string, req: NextApiRequest, res: NextApiResponse) {
    const _hash = crypto.createHash("sha256")
    _hash.push(email, 'utf-8')
    _hash.push(new Date().toISOString(), 'utf-8')
    const hash = _hash.digest("hex")

    console.log(`Email: ${email} Hash: ${hash}`)

    client.query(
        q.Map(
            q.Paginate(
                q.Match(
                    q.Index(`users_by_email`), email
                )
            ),
            q.Lambda("x", q.Update(q.Var("x"), {data: {hash}}))
        )
    ).then((results: any) => {
        const {protocol, host} = absoluteUrl(req, 'localhost:8004')
        const url = `${protocol}//${host}/reset#${hash}`
        ses.sendEmail({
            Source: "website@eurekacycling.org.au",
            Destination: {ToAddresses: [email]},
            Message: {
                Body: {Html:{Data:`"Reset link: <a href="${url}">${url}</a>`}},
                Subject: {Data:"Eureka Cycling Password Reset"}
            }
        }, (err: AWSError, data: SendEmailResponse) => {
            console.log('Error: ', err)
            console.log('Data: ',data)
            res.json({"email-sent": data?.MessageId || err})
        })
    }).catch((error) => {
        res.json({error: error})
    })
}

function doReset(client: Client, email: string, password: string, hash: string, res: NextApiResponse) {
    client.query(
        q.Map(
            q.Paginate(
                q.Match(
                    q.Index(`user_by_hash`), hash
                )
            ),
            q.Lambda("x", q.Update(q.Var("x"),
                {
                    data: {hash: ""},
                    credentials: {password}
                }
            ))
        )
    ).then(({data}: { data: User[] }) => {
        if (data.length > 0) {
            doLogin(client, data[0].data.email, password, res)
        }
    }).catch((error) => {
        res.json({error: error})
    })
}

interface LoginRequest extends NextApiRequest {
    body: {
        password?: string
        email: string,
        action?: "login" | "logout" | "reset-request" | "reset"
        hash?: string
    }
}

export default (req: LoginRequest, res: NextApiResponse) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET
    })
    const {body: {password, email, action, hash}} = req
    // res.json(rawHeaders)

    switch (action) {
        case 'reset':
            return doReset(client, email, password, hash, res)
        case 'reset-request':
            return doResetRequest(client, email, req, res)
        case 'logout':
        // return doLogout(client, email, res)
        default: {
            return doLogin(client, email, password, res);
        }

    }
}

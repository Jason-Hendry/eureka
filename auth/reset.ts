import {Client} from "faunadb";
import {UserData} from "../models/User";
import {q} from "../services/faunadb";
import {sendEmail} from "../services/email";
import {doLogin} from "./login";
import {LoginResponse} from "../services/Login";

import crypto from "crypto";
import {FaunaDBList} from "../services/DirectService";

interface URLDetails {
    protocol: string
    host: string
}

export async function doResetRequest(client: Client, email: string, urlDetails: URLDetails): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const _hash = crypto.createHash("sha256")
        _hash.update(email + new Date().toISOString())
        const hash = _hash.digest("hex")

        console.log(`Email: ${email} (${email + new Date().toISOString()}) Hash: ${hash}`)

        client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index(`users_by_email`), email
                    )
                ),
                q.Lambda("x", q.Update(q.Var("x"), {data: {hash}}))
            )
        ).then(() => {
            const {protocol, host} = urlDetails
            const url = `${protocol}//${host}/reset#${hash}`
            sendEmail(email, "Eureka Cycling Password Reset", `"Reset link: <a href="${url}">${url}</a>`, resolve);
        }).catch((error) => {
            reject({error: error})
        })
    })
}

export async function doReset(client: Client, email: string, password: string, hash: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
        client.query<FaunaDBList<UserData>>(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index(`user_by_hash`), hash
                    )
                ),
                q.Lambda("x", q.Update(q.Var("x"),
                    {
                        data: {hash: null},
                        credentials: {password}
                    }
                ))
            )
        ).then(({data}) => {
            if (data.length > 0) {
                doLogin(client, data[0].data.email, password).then(resolve).catch(reject)
            }
        }).catch((error) => {
            reject({error: error})
        })
    })
}

export function ResetService(hash: string, password: string, callback: (secret: string)=>void, errorCallback: (arg: unknown)=>void): void {
    const action = "reset"
    fetch("/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({hash, password, action})
    })
        .then(res => <LoginResponse><unknown>res.json())
        .then(({secret}) => callback(secret))
        .catch(errorCallback)
}

export function ResetRequestService(email: string, callback:(arg: unknown)=>void, errorCallback: (arg: unknown)=>void): void {
    const action = "reset-request"
    fetch("/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, action})
    })
        .then(res => <LoginResponse><unknown>res.json())
        .then(callback)
        .catch(errorCallback)
}

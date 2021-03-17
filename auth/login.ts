import {Client} from "faunadb";
import {ExprArg} from "faunadb/src/types/query";
import {q} from "../services/faunadb";
import {LoginResponse} from "../services/Login";

interface LoginMatch {
    instance: ExprArg
    secret: string
}

export async function doLogin(client: Client, email: string, password: string): Promise<unknown> {
    return new Promise((resolve, reject) => {

        client.query<LoginMatch>(
            q.Login(
                q.Match(q.Index('users_by_email'), email),
                {password}
            )
        ).then(({ secret}) => {
            resolve({secret})
        }).catch((error) => {
            reject({error: error})
        })
    })
}

export function LoginService(email: string, password: string, callback: (secret: string)=>void, errorCallBack: (e: unknown)=>void): void {
    const action = "login"
    fetch("/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, action})
    })
        .then(res => <LoginResponse><unknown>res.json())
        .then(({secret}) => callback(secret))
        .catch(errorCallBack)
}

import {IncomingMessage, ServerResponse} from "http";
import {Interface} from "readline";
import btoa from "btoa"

const faunadb = require('faunadb')
const q = faunadb.query

const crypto = require('crypto');

interface RegisterRequest {
    password: string,
    email: string,
}

export default ({body: {password, email}}, res) => {
    console.log("FAUNADB_SECRET", process.env.FAUNEDB_SECRET)
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET
    })
    const secretRaw = crypto.randomBytes(20);
    const hash = crypto.createHmac('sha256', secretRaw).update(password).digest('hex');
    const secret = btoa(secretRaw)
    const roles = [];

    const createP = client.query(
        q.Create(
            q.Collection('User'),
            {
                data: {email, roles},
                credentials: {password}
            }
        )
    ).then(({ref}) => {
        res.json({email, ref})
    }).catch((error) => {
        res.status(error.requestResult.statusCode).json({error: error})
    })

}

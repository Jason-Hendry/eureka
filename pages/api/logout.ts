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
    // const secretRaw = crypto.randomBytes(20);
    // const hash = crypto.createHmac('sha256', secretRaw).update(password).digest('hex');
    // const secret = btoa(secretRaw)
    // const roles = [];

    client.query(
        q.Logout(
            q.Match(q.Index('users_by_email'), email),
            {password}
        )
    ).then(({ref}) => {
        res.json({ref})
    }).catch((error) => {
        res.json({error: error})
    })

}

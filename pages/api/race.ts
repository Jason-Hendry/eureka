import {IncomingMessage, ServerResponse} from "http";
import {Interface} from "readline";
import btoa from "btoa"

const faunadb = require('faunadb')
const q = faunadb.query

export function RaceService(race, secret, callback, error) {
    fetch("/api/race", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({secret, ...race})
    })
        .then(res => res.json())
        .then(result => callback(result))
        .catch(error => error(error))
}

export default ({body}, res) => {
    const client = new faunadb.Client({
        secret: body.secret
    })
    delete body.secret
    const createP = client.query(
        q.Create(
            q.Collection('Races'),
            {
                data: body,
            }
        )
    ).then(({ref}) => {
        res.json({ref})
    }).catch((error) => {
        res.status(error.requestResult.statusCode).json({error: error})
    })

}

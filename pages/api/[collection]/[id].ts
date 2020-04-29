import {IncomingMessage, ServerResponse} from "http";
import {Interface} from "readline";
import btoa from "btoa"
import {reject} from "q";

const faunadb = require('faunadb')
const q = faunadb.query

export function DocPutService(collection, id, data, secret) {
    return new Promise((resolve, reject) => {

        fetch(`/api/${collection}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({secret, ...data})
        })
            .then(res => res.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

export function DocGetService(collection, id, secret) {
    return new Promise((resolve, reject) => {
        console.log(`Fetching: /api/${ collection }/${ id }?secret=${ secret }`)
        fetch(`/api/${ collection }/${ id }?secret=${ secret }`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

export default ({body, method, query: {collection, id, secret}}, res) => {
    const client = new faunadb.Client({
        secret: body.secret ?? secret
    })
    if (method == "PUT") {
        delete body.secret
        client.query(
            q.Update(
                q.Ref(q.Collection(collection), id),
                {
                    data: body,
                }
            )
        ).then(({ref: {id}, data}) => {
            res.json({id, data})
        }).catch((error) => {
            res.status(error.requestResult.statusCode).json({error: error})
        })
    } else {
        client.query(
            q.Get(
                q.Ref(q.Collection(collection), id)
            )
        ).then(({data}) => {
            res.json({id, data})
        }).catch((error) => {
            res.status(error.requestResult.statusCode).json({error: error})
        })
    }
}

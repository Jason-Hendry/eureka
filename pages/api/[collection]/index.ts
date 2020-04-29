import {IncomingMessage, ServerResponse} from "http";
import {Interface} from "readline";
import btoa from "btoa"

const faunadb = require('faunadb')
const q = faunadb.query

// export function DocPutService(collection, data, secret, callback, error) {
//     fetch("/api/${collection}/${id}?secret=${secret}", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({secret, ...data})
//     })
//         .then(res => res.json())
//         .then(result => callback(result))
//         .catch(error => error(error))
// }
// export function DocGetService(collection, id, secret, callback, error) {
//     fetch("/api/${collection}/${id}?secret=${secret}", {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(res => res.json())
//         .then(result => callback(result))
//         .catch(error => error(error))
// }

export default ({body,method,query:{collection, id, secret}}, res) => {
    const client = new faunadb.Client({
        secret: body.secret ?? secret
    })
    if(method == "POST") {
        // Create New
        delete body.secret
        client.query(
            q.Create(
                q.Collection(collection),
                {
                    data: body,
                }
            )
        ).then(({ref:{id}, data}) => {
            res.json({id, data})
        }).catch((error) => {
            res.status(error.requestResult.statusCode).json({error: error})
        })
    } else {
        // List All
        client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index("all_races")
                    )
                ),
                q.Lambda("x", q.Get(q.Var("x")))
            )
        ).then(({data}) => {
            res.json(data.map(({data, ref:{id}}) => ({id, data})))
        }).catch((error) => {
            res.status(error.requestResult.statusCode).json({error: error})
        })
    }
}

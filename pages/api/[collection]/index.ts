

const faunadb = require('faunadb')
const q = faunadb.query


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
                        q.Index(`all${collection}`)
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

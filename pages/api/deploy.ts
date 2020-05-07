import {format} from "date-fns";
const axios = require('axios').default;

const faunadb = require('faunadb')
const q = faunadb.query

export default (req, res) => {

    console.log(req)

    const {method, query:{deploy, secret}} = req
    const client = new faunadb.Client({secret})
    if(method == "POST") {
        const date = format(new Date, "yyyy-MM-dd\T:HH:mm:ss")
        client.query(
            q.Create(
                q.Collection("Deploy"),
                {
                    data: { date },
                }
            )
        ).then(({ref:{id}, data}) => {
            console.log("Deploying: ", process.env.DEPLOY)
            axios.get(process.env.DEPLOY, {
            }).then(d => d.json()).then(r => res.send(r)).catch(e => res.send(e))
        }).catch((error) => {
            res.status(error.requestResult.statusCode).json({error: error})
        })
    }
    else {
        axios.get("https://api.vercel.com/v6/now/deployments?limit=1", {
            headers: {"Authorization": "Bearer "+process.env.DEPLOY_KEY}
        }).then(d => d.json()).then(r => res.send(r)).catch(e => res.send(e))
    }
}

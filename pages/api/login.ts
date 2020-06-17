import {IncomingMessage, ServerResponse} from "http";
import {Interface} from "readline";
import btoa from "btoa"
import React from "react";
import {LoginResponse} from "../../services/Login";

const faunadb = require('faunadb')
const q = faunadb.query

const crypto = require('crypto');


export function LoginService(email, password, callback, error) {
        fetch("/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => <LoginResponse><unknown>res.json())
        .then(({secret, Credentials}) => callback(secret,Credentials))
        .catch(error => error(error))
}

const AWS = require("aws-sdk");
const sts = new AWS.STS();

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
        q.Login(
            q.Match(q.Index('users_by_email'), email),
            {password}
        )
    ).then(({instance, secret}) => {
        // console.log(ref['@ref'].id)
        client.query(q.Get(instance)).then(({data}) => {
            // res.json({data, secret})
            AWS.config.getCredentials(function (err) {
                if (err) console.log(err.stack);
                // credentials not loaded
                else {
                    sts.getSessionToken({
                        DurationSeconds: 86400, // 24hrs
                    }, (e, {Credentials}) => res.json({Credentials, secret}))
                }
            });
        })
            .catch(error => {
                res.json({error: error})
            })
        // res.json({instance})
    }).catch((error) => {
        res.json({error: error})
    })

}

import {Ref} from "react";

// const fs = require('fs');
// const readline = require('readline');
// const {google} = require('googleapis');
var parse = require('date-fns/parse')
// import authorize from '../../google/auth'

const faunadb = require('faunadb')
const q = faunadb.query

export function RaceListService(secret, callback, error) {
    fetch("/api/races?secret="+secret, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({secret, ...race})
    })
        .then(res => res.json())
        .then(result => callback(result))
        .catch(error => error(error))
}


export default ({query:{secret}}, res) => {
    const client = new faunadb.Client({
        secret: secret
    })
    client.query(
        q.Map(q.Paginate(q.Match(q.Index("all_races"))), q.Lambda("x", q.Get(q.Var("x"))))
    ).then(({data}) => {

        console.log(JSON.stringify(data))
        res.json(data.map(({data, ref:{id}}) => {
            return {
                id, data
            }
        }))
    }).catch((error) => {
        res.json({error: error})
    })

    // Old Google Sheet DataSource
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'application/json')
    // const races = listMajors(authorize()).then(d => res.send(JSON.stringify(d)))
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
// interface KeyValue {
//     Timestamp: Date
//     Date: Date
//     Title: string
//     Course: string
//     'Email Address': string
// }
//
// export async function listMajors(auth): Promise<Array<KeyValue>> {
//     return new Promise((resolve, reject) => {
//         const sheets = google.sheets({version: 'v4', auth});
//         sheets.spreadsheets.values.get({
//             spreadsheetId: '1kNHmOwuJiWbWBD4Q-acm_f6gc-00BPg5evHS_wQuhyo',
//             range: 'Form Responses 1!A1:E',
//         }, (err, res) => {
//             if (err) reject('The API returned an error: ' + err);
//             const rows = res.data.values;
//             let data = [];
//             let headers = [];
//             if (rows.length) {
//                 // Print columns A and E, which correspond to indices 0 and 4.
//                 rows.map((row, i) => {
//                     if (i === 0) {
//                         headers = row;
//                     } else {
//                         let rowData = {};
//                         row.map((v, i) => {
//                             const key = headers[i];
//                             switch (key) {
//                                 case 'Timestamp':
//                                     v = parse(v, "yyyy-MM-dd hh:mm:ss a", new Date())
//                                     break
//                                 case 'Date':
//                                     v = parse(v, "yyyy-MM-dd", new Date())
//                             }
//                             rowData[key] = v
//                         })
//                         data.push(rowData);
//                     }
//                 });
//                 resolve(data)
//             } else {
//                 reject('No data found.');
//             }
//         });
//     });
// }



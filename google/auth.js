const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var parse = require('date-fns/parse')
import atob from "atob"

const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
export default function authorize() {
    // const {client_secret, client_id, redirect_uris} = credentials.web;
    const credentials = JSON.parse(atob(process.env.GOOGLE_JSON.replace(/ /g, "\n")))
    const auth = new google.auth.JWT({scopes})
    auth.fromJSON(credentials)
    return auth
}

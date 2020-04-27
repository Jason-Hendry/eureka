import React, {useState} from "react"
import {Button, TextField} from "@material-ui/core";
import {IncomingMessage} from "http";
import {LoginService} from "../../pages/api/login";


export default function Admin({setSecret}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login = () =>  {
        LoginService(email, password, setSecret, setError)
    }

    return <div>
        {error}
        <TextField label={"Email"} value={email} onChange={e => setEmail(e.target.value)} />
        <br/>
        <TextField type={"password"} label={"Password"} value={password} onChange={e => setPassword(e.target.value)} />
        <br/>
        <br/>
        <Button variant={"outlined"} color={"primary"} onClick={login}>Login</Button>
    </div>
}

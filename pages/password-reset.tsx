import React, {FormEventHandler, useEffect, useState} from "react"
import {
    Button,
    Card,
    CardContent,
    Container, Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {ResetRequestService, ResetService} from "./api/login";
import {useRouter} from 'next/router'
import {useLocalStorage} from "../components/AdminTheme/AdminTheme";
import {makeStyles} from "@material-ui/styles";
import {AdminFormTheme} from "../components/AdminTheme/AdminFormTheme";


export default function Index(props) {
    const [email, setEmail] = useState<string>("")
    const [resetSent, setResetSent] = useState<boolean>(false)

    const submitResetRequest: (event: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        ResetRequestService(email, (e) => {
            console.log('Success: ', e)
            setEmail("")
            setResetSent(true)

        }, e => {
            console.log(e)
        })
        e.preventDefault();
    }


    return (
        <AdminFormTheme>
            <CardContent>
                <form onSubmit={submitResetRequest}>
                    <Typography variant={"h6"}>Set Password</Typography>
                    {resetSent ?
                        <Typography variant={"body1"}>Reset link has been sent, please check your
                            email</Typography> : null}
                    <TextField margin={"normal"} fullWidth label={"Email"} onChange={e => setEmail(e.target.value)}
                               value={email} type={"text"}/>
                    <Button fullWidth variant={"contained"} color={"primary"} type={"submit"}
                            value={"Reset Password"}>Reset
                        Password</Button>
                </form>
            </CardContent>
        </AdminFormTheme>)

}

export async function getStaticProps(props) {
    return {props}
}


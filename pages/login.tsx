import React, {FormEventHandler, useEffect, useState} from "react"
import {
    Button, CardActions,
    CardContent,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {LoginService, ResetRequestService, ResetService} from "./api/login";
import {useRouter} from 'next/router'
import {useLocalStorage} from "../components/AdminTheme/AdminTheme";
import Link from "next/link";
import {AdminFormTheme} from "../components/AdminTheme/AdminFormTheme";

export default function Index(props) {
    const router = useRouter()

    const [secret, setSecret] = useLocalStorage("secret", "")
    const [awsCredentials, setAwsCredentials] = useLocalStorage("setAwsCredentials", "")

    const [showPass, setShowPass] = useState<boolean>(false)
    const [pass, setPass] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [resetSent, setResetSent] = useState<boolean>(false)

    const hash = process.browser ? (document.location.hash.substring(1)) : ""

    const hideShowType = showPass ? "text" : "password"
    const ShowPassIcon = showPass ? VisibilityOffIcon : VisibilityIcon

    const showPassAdornment = <InputAdornment position={"end"}><IconButton
        onClick={() => setShowPass(!showPass)}><ShowPassIcon/></IconButton></InputAdornment>


    const submitLogin: (event: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        LoginService(email, pass, (s, c) => {
            setSecret(s);
            setAwsCredentials(c);
            if(hash) {
                return router.push(decodeURIComponent(hash))
            }
            router.push("/admin")
        }, e => {
            console.log(e)
        })
        e.preventDefault();
    }


    return <AdminFormTheme>

        <CardContent><form onSubmit={submitLogin}>
            <Typography variant={"h6"}>Login</Typography>
            {resetSent ? <Typography variant={"h6"}>Reset link has been sent, please check your email</Typography> : null}
            <TextField margin={"normal"} fullWidth label={"Email"} onChange={e => setEmail(e.target.value)} value={email}
                       type={"text"}/>
            <TextField margin={"normal"} fullWidth label={"Password"} onChange={e => setPass(e.target.value)} value={pass}
                       type={hideShowType} InputProps={{endAdornment: showPassAdornment}}/>
            <Button fullWidth variant={"contained"} color={"primary"} type={"submit"} value={"Login"}>Login</Button>

        </form>
            <CardActions>
                <Link href={"/password-reset"}>Forgetting your password? Reset it now</Link>
            </CardActions></CardContent>


    </AdminFormTheme>

}

export async function getStaticProps(props) {
    return {props}
}

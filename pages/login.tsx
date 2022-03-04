import React, {FC, useState} from "react"
import {
    Button, CardActions,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useRouter} from 'next/router'
import Link from "next/link";
import {LoginService} from "../auth/login";
import {AdminFormTheme} from "../layout/Admin/AdminFormTheme";
import {preventableEvent} from "../common/events";
import {useLocalStorage} from "../effects/UseLocalStorage";

export const Login:FC<unknown> = () => {
    const router = useRouter()

    const [, setSecret] = useLocalStorage("secret", "")

    const [showPass, setShowPass] = useState<boolean>(false)
    const [pass, setPass] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const hash = process.browser ? (document.location.hash.substring(1)) : ""

    const hideShowType = showPass ? "text" : "password"
    const ShowPassIcon = showPass ? VisibilityOffIcon : VisibilityIcon

    const showPassAdornment = <InputAdornment position={"end"}><IconButton
        onClick={() => setShowPass(!showPass)}><ShowPassIcon/></IconButton></InputAdornment>


    const submitLogin = (e: preventableEvent) => {
        LoginService(email, pass, (s) => {
            setSecret(s);
            if (hash) {
                return router.push(decodeURIComponent(hash))
            }
            router.push("/admin")
        }, e => {
            console.log(e)
        })
        e.preventDefault();
    }


    return <AdminFormTheme>
        <CardContent>
            <form onSubmit={submitLogin}>
                <Typography variant={"h6"}>Login</Typography>
                <TextField margin={"normal"} fullWidth label={"Email"} onChange={e => setEmail(e.target.value)}
                           value={email} id={'email'}
                           type={"text"}/>
                <TextField margin={"normal"} fullWidth label={"Password"} onChange={e => setPass(e.target.value)}
                           value={pass} id={'password'}
                           type={hideShowType} InputProps={{endAdornment: showPassAdornment}}/>
                <Button fullWidth variant={"contained"} color={"primary"} type={"submit"} value={"Login"} onClick={submitLogin}>Login</Button>
            </form>
            <CardActions>
                <Link href={"/password-reset"}>Forgetting your password? Reset it now</Link>
            </CardActions>
        </CardContent>
    </AdminFormTheme>

}
export default Login

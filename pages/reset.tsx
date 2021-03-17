import React, {FC, useState} from "react"
import {
    Button,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {useRouter} from 'next/router'
import { ResetService} from "../auth/reset";
import {AdminFormTheme} from "../layout/Admin/AdminFormTheme";
import {useLocalStorage} from "../layout/Admin/AdminTheme";

export const Index: FC<unknown> = (props) => {
    const router = useRouter()

    const [secret, setSecret] = useLocalStorage("secret", "")

    const [showPass, setShowPass] = useState<boolean>(false)
    const [pass, setPass] = useState<string>("")

    const hash = process.browser ?
        (document.location.hash.substring(1)) : ""

    const hideShowType = showPass ? "text" : "password"
    const ShowPassIcon = showPass ? VisibilityOffIcon : VisibilityIcon

    const showPassAdornment = <InputAdornment position={"end"}><IconButton
        onClick={() => setShowPass(!showPass)}><ShowPassIcon/></IconButton></InputAdornment>

    const submitReset: (event: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        ResetService(hash, pass, (s) => {
            setSecret(s);
            router.push("/admin")
        }, e => {
            console.log(e)
        })
        e.preventDefault();
    }

    return <AdminFormTheme>

        <CardContent>
            <form onSubmit={submitReset}>
                <Typography variant={"h6"}>Set Password</Typography>
                <TextField margin={"normal"} fullWidth label={"Password"} onChange={e => setPass(e.target.value)}
                           value={pass}
                           type={hideShowType} InputProps={{endAdornment: showPassAdornment}}/>
                <Button fullWidth variant={"contained"} color={"primary"} type={"submit"} value={"Set New Password"}>Set
                    New
                    Password</Button>
            </form>
        </CardContent>

    </AdminFormTheme>

}
export default Index

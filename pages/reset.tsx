import React, {VFC, useState} from "react"
import {
    Button,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useRouter} from 'next/router'
import { ResetService} from "../auth/reset";
import {AdminFormTheme} from "../layout/Admin/AdminFormTheme";
import {useLocalStorage} from "../effects/UseLocalStorage";

export const Index: VFC = () => {
    const router = useRouter()

    const [, setSecret] = useLocalStorage("secret", "")

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

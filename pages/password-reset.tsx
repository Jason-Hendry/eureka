import React, {FC, useState} from "react"
import {
    Button, CardActions,
    CardContent,
    TextField,
    Typography
} from "@mui/material";
import Link from "next/link";
import {ResetRequestService} from "../auth/reset";
import {AdminFormTheme} from "../layout/Admin/AdminFormTheme";


export const PasswordReset: FC<unknown> = () => {
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
            <CardActions>
                <Link href={'/login'}>Go to Login</Link>
            </CardActions>
        </AdminFormTheme>)

}

export default PasswordReset


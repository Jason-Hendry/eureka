import React, {useContext, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import { DocGetUser, DocPutUser} from "../../../services/DocumentService";
import {UserData} from "../../../models/User";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    field: {
       marginBottom: theme.spacing(2)
    }
}))
const inputProps = {
    step: 300,
};

function User({id}) {
    const secret = useContext(Secret);
    const classes = useStyles();
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)

    const [user, setUser] = useState<UserData>({email:""})
    const [btnLabel, setBtnLabel] = useState("Save")

    if(process.browser && !loaded) {
        setLoaded(true)

        DocGetUser(id, secret).then(r => {
            setUser(r.data)
        }).catch((err) => {
            // console.log('User.ts: ', err)
            setUser(null)
        })
    }

    const save = () => {
        setBtnLabel("Saving...")
        DocPutUser(user, id, secret).then(e => {
            setBtnLabel("Save")
            router.push("/admin/users")
        }).catch(e => setBtnLabel("Failed"));
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit User</Typography></Toolbar>

        <TextField className={classes.field} variant={"standard"}
                   label={'Email'}
                   value={user.email || ""}
                   onChange={(e) => setUser({...user, email: e.target.value})}
                   type={"email"} InputLabelProps={{shrink: true}} fullWidth={true} />

        <Button variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper>

}
User.getInitialProps = async ctx => {
    return { id: ctx.query.id }
}
export default User

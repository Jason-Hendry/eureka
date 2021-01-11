import React, {useContext, useEffect, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, FormControl, FormLabel, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {DocGetUser, DocPutRaces, DocPutUser, RaceFetcher, UserFetcher} from "../../../services/APIService";
import {User, UserData} from "../../../models/User";
import useSWR, {mutate} from "swr";
import {Race} from "../../../models/Race";
import {Image} from "../../../models/Image";
import {ImageSelector} from "../../../components/ImageSelector";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    field: {
       marginBottom: theme.spacing(2)
    },
    image: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}))
const inputProps = {
    step: 300,
};

export default function EditUser() {
    const classes = useStyles();
    const router = useRouter();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#','') : "";
    const key = `/api/User/${id}?secret=${secret}`
    const {data, error} = useSWR<User>(key, UserFetcher)
    const user = data?.data

    const setUser = (userData: UserData) => {
        mutate(key, {...data, data:userData}, false)
    }

    const addImage = (image: Image) => {
        const Images = user?.Images || [];
        Images.push(image)
        setUser({...user, Images})
    }

    const [btnLabel, setBtnLabel] = useState("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutUser(user, id, secret).then(e => {
            setBtnLabel("Save")
            router.push("/admin/users")
        }).catch(e => setBtnLabel("Failed"));
    }

    return user ? <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit User</Typography></Toolbar>

        <TextField className={classes.field}
                   label={'Email'}
                   value={user.email || ""}
                   onChange={(e) => setUser({...user, email: e.target.value})}
                   type={"email"}
                   InputLabelProps={{shrink: true}}
                   fullWidth={true} />

        <TextField className={classes.field}
                   label={'Full Name'}
                   value={user.name || ""}
                   onChange={(e) => setUser({...user, name: e.target.value})}
                   InputLabelProps={{shrink: true}}
                   fullWidth={true} />

        <FormControl margin={"normal"} className={classes.field}>
            <FormLabel>Images</FormLabel>

            {user?.Images ? user.Images.map((i, k) => <img className={classes.image} key={k}
                                                              src={i.data.admin}/>) : null}

            <ImageSelector addImage={addImage}/>
        </FormControl>


        <Button fullWidth={true} variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper> : null

}
export async function getStaticProps(props) {
    return {props:{}}
}

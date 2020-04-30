import React, {useContext, useEffect, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {
    DocPutResults,
    ResultsFetcher
} from "../../../services/DocumentService";
import {Results, ResultsData} from "../../../models/Results";
import useSWR, {mutate} from "swr";

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

function Result() {
    const classes = useStyles();
    const router = useRouter();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#','') : "";
    const key = `/api/Results/${id}?secret=${secret}`
    const {data, error} = useSWR<Results>(key, ResultsFetcher)
    const result = data?.data

    const setResult = (resultData: ResultsData) => {
        mutate(key, {...data, data:resultData}, false)
    }

    const [btnLabel, setBtnLabel] = useState("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutResults(result, id, secret).then(e => {
            setBtnLabel("Save")
            router.push("/admin/results")
        }).catch(e => setBtnLabel("Failed"));
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit Result</Typography></Toolbar>

        <TextField className={classes.field} variant={"standard"}
                   label={'Result.ts Date'}
                   value={result?.['Date'] || ""}
                   onChange={(e) => setResult({...result, Date: e.target.value})}
                   type={"date"} InputLabelProps={{shrink: true}} fullWidth={true} />
        <TextField className={classes.field} variant={"standard"}
                   label={'Title'}
                   onChange={(e) => setResult({...result, Title: e.target.value})}
                   value={result?.['Title'] || ""} InputLabelProps={{shrink: true}} fullWidth={true} />


        <Button variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper>

}
export async function getStaticProps(props) {
    return {props}
}
export default Result

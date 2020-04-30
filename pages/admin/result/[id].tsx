import React, {useContext, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {DocGetResults, DocPutResults} from "../../../services/DocumentService";
import {ResultsData} from "../../../models/Results";

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

function Result({id}) {
    const secret = useContext(Secret);
    const classes = useStyles();
    const router = useRouter()

    const [loaded, setLoaded] = useState(false)
    const [result, setResult] = useState<ResultsData>({Title:""})
    const [btnLabel, setBtnLabel] = useState("Save")

    if(process.browser && !loaded) {
        setLoaded(true)
        DocGetResults(id, secret).then(r => {
            setResult(r.data)
        }).catch((err) => {
            // console.log('Result.ts: ', err)
            setResult(null)
        })
    }

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
Result.getInitialProps = async ctx => {
    return { id: ctx.query.id }
}
export default Result

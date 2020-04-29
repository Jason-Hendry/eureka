import React, {useContext, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {DocGetService, DocPutService} from "../../api/[collection]/[id]";
import {useRouter} from "next/router";
import {route} from "next/dist/next-server/server/router";

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

function Race({raceId}) {
    const secret = useContext(Secret);
    const classes = useStyles();
    const router = useRouter()

    const [race, setRace] = useState(null)
    const [btnLabel, setBtnLabel] = useState("Save")

    if(process.browser && race === null) {
        console.log(raceId)
        DocGetService("Races", raceId, secret).then(r => {
            console.log('Race: ', r)
            setRace(r['data'])
        }).catch((err) => {
            console.log('Race: ', err)
            setRace({})
        })
    }

    const save = () => {
        setBtnLabel("Saving...")
        DocPutService("Races", raceId, race, secret).then(e => {
            setBtnLabel("Save")
            router.push("/admin/races")
        }).catch(e => setBtnLabel("Failed"));
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit Race</Typography></Toolbar>

        <TextField className={classes.field} variant={"standard"}
                   label={'Race Date'}
                   value={race?.['Date'] || ""}
                   onChange={(e) => setRace({...race, Date: e.target.value})}
                   type={"date"} InputLabelProps={{shrink: true}} fullWidth={true} />
        <TextField className={classes.field} variant={"standard"}
                   label={'Title'}
                   onChange={(e) => setRace({...race, Title: e.target.value})}
                   value={race?.['Title'] || ""} InputLabelProps={{shrink: true}} fullWidth={true} />

        <TextField className={classes.field}
                   label={"Registration Cutoff"}
                   value={race?.['RegistrationCutoff'] || ""}
                   onChange={(e) => setRace({...race, RegistrationCutoff: e.target.value})}
                   id="time" type="time" inputProps={inputProps}  InputLabelProps={{shrink: true}} fullWidth={true}/>
        <TextField className={classes.field}
                   label={"Race Start Time"}
                   value={race?.['RaceStartTime'] || ""}
                   onChange={(e) => setRace({...race, RaceStartTime: e.target.value})}
                   id="time" type="time" inputProps={inputProps}  InputLabelProps={{shrink: true}} fullWidth={true}/>

        <Button variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper>

}
Race.getInitialProps = async ctx => {
    return { raceId: ctx.query.race }
}
export default Race
import React, {useContext, useEffect, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {
    Button,
    FormControl,
    FormLabel,
    MenuItem,
    Paper,
    TextField,
    Theme,
    Toolbar,
    Typography,
    Select, Switch
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {
    CourseListFetcher,
    DocPutRaces,
    RaceFetcher,
    UserListFetcher
} from "../../../services/APIService";
import {Race, RaceFormat} from "../../../models/Race";
import useSWR, {mutate} from "swr";
import {CourseList} from "../../../models/Course";
import {UserList} from "../../../models/User";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    field: {
        marginBottom: theme.spacing(4),
        marginLeft: theme.spacing(2)
    }
}))
const inputProps = {
    step: 300,
};


export default function EditImage() {
    const classes = useStyles();
    const router = useRouter();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#', '') : "";
    const key = `/api/Races/${id}?secret=${secret}`
    const {data} = useSWR<Race>(key, RaceFetcher)
    const [edit, setEdit] = useState<Race>(null)

    const race = {...data?.data, ...edit}

    const courseListSWR = useSWR<CourseList>(`/api/Courses?secret=${secret}`, CourseListFetcher)
    const userListSWR = useSWR<UserList>(`/api/User?secret=${secret}`, UserListFetcher)
    const courseList = courseListSWR?.data
    const userList = userListSWR?.data

    const setRace = (raceData) => {
        setEdit(raceData)
        mutate(key, {...data, data: raceData}, false).catch(e => console.log(e))
    }

    const [btnLabel, setBtnLabel] = useState("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutRaces(race, id, secret).then(() => {
            setBtnLabel("Save")
            router.push("/admin/races").catch(e => console.log("Route change failed: ", e))
        }).catch(() => setBtnLabel("Failed"));
    }

    const CourseItemList = courseList ? courseList.map(c => <MenuItem key={c.id}
                                                                      value={c.id}>{c.data.Title}</MenuItem>) : null;
    const UserItemList = userList ? userList.map(c => <MenuItem key={c.id}
                                                                value={c.id}>{c.data.name}</MenuItem>) : null;
    const RaceFormatItemList = Object.keys(RaceFormat).map(key => <MenuItem key={key} value={key}>{RaceFormat[key]}</MenuItem>)

    const defaultFieldProps = {
        className: classes.field,
        fullWidth: true,
        InputLabelProps: {shrink: true}
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit
            Race</Typography></Toolbar>

        <TextField {...defaultFieldProps}
                   label={'Race Date'}
                   value={race?.['Date'] || ""}
                   onChange={(e) => setRace({...race, Date: e.target.value})}
                   type={"date"}
        />

    </Paper>

}

export async function getStaticProps(props) {
    return {props:{}}
}

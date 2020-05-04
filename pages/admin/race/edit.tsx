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
    DocGetRaces,
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


export default function EditRace() {
    const classes = useStyles();
    const router = useRouter();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#', '') : "";
    const key = `/api/Races/${id}?secret=${secret}`
    const {data, error} = useSWR<Race>(key, RaceFetcher)
    const [edit, setEdit] = useState<Race>(null)

    const race = {...data?.data, ...edit}

    const courseListSWR = useSWR<CourseList>(`/api/Courses?secret=${secret}`, CourseListFetcher)
    const userListSWR = useSWR<UserList>(`/api/User?secret=${secret}`, UserListFetcher)
    const courseList = courseListSWR?.data
    const userList = userListSWR?.data

    const setRace = (raceData) => {
        setEdit(raceData)
        mutate(key, {...data, data: raceData}, false)
    }

    const [btnLabel, setBtnLabel] = useState("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutRaces(race, id, secret).then(e => {
            setBtnLabel("Save")
            router.push("/admin/races")
        }).catch(e => setBtnLabel("Failed"));
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

        <FormControl className={classes.field}>
            <FormLabel>Cancelled</FormLabel>
            <Switch
                color={"secondary"}
                checked={Boolean(race?.Cancelled || false)}
                onChange={(e) => setRace({...race, Cancelled: e.target.checked, Postponed: false})}
            />
        </FormControl>
        <FormControl className={classes.field}>
            <FormLabel>Postponed</FormLabel>
            <Switch
                color={"secondary"}
                checked={Boolean(race?.Postponed || false)}
                onChange={(e) => setRace({...race, Postponed: e.target.checked, Cancelled: false})}
            />
        </FormControl>

        <FormControl className={classes.field} fullWidth={true}>
            <FormLabel>Race Format</FormLabel>
            <Select
                fullWidth={true}
                value={race?.RaceFormat || ""}
                onChange={(e) => setRace({...race, RaceFormat: e.target.value})}>
                {RaceFormatItemList}
            </Select>
        </FormControl>

        <TextField {...defaultFieldProps}
                   label={'Title'}
                   onChange={(e) => setRace({...race, Title: e.target.value})}
                   value={race?.['Title'] || ""}
        />

        <TextField {...defaultFieldProps}
                   label={"Registration Cutoff"}
                   value={race?.['RegistrationCutoff'] || ""}
                   onChange={(e) => setRace({...race, RegistrationCutoff: e.target.value})}
                   type="time"
                   inputProps={inputProps}
        />
        <TextField {...defaultFieldProps}
                   label={"Race Start Time"}
                   value={race?.RaceStartTime || ""}
                   onChange={(e) => setRace({...race, RaceStartTime: e.target.value})}
                   type="time"
                   inputProps={inputProps}
        />

        <FormControl className={classes.field} fullWidth={true}>
            <FormLabel>Course</FormLabel>
            <Select
                fullWidth={true}
                value={race?.Course || ""}
                onChange={(e) => setRace({...race, Course: e.target.value})}>
                {CourseItemList}
            </Select>
        </FormControl>

        <TextField {...defaultFieldProps}
                   label={"Course Laps"}
                   value={race?.CourseLaps || ""}
                   onChange={(e) => setRace({...race, CourseLaps: e.target.value})}
                   type={"number"}
                   inputProps={inputProps}
        />

        <FormControl className={classes.field} fullWidth={true}>
            <FormLabel>Marshalls</FormLabel>
            <Select
                fullWidth={true}
                multiple={true}
                value={race?.Marshalls || []}
                onChange={(e) => setRace({...race, Marshalls: e.target.value})}>
                {UserItemList}
            </Select>
        </FormControl>


        <FormControl className={classes.field}>
            <FormLabel>VCV Event</FormLabel>
            <Switch
                color={"primary"}
                checked={Boolean(race?.VCVEvent || false)}
                onChange={(e) => setRace({...race, VCVEvent: e.target.checked, ClubChamps: false, Interclub: false, Trophy: false})}
            />
        </FormControl>
        <FormControl className={classes.field}>
            <FormLabel>Interclub</FormLabel>
            <Switch
                color={"primary"}
                checked={Boolean(race?.Interclub || false)}
                onChange={(e) => setRace({...race, Interclub: e.target.checked, VCVEvent: false, ClubChamps: false, Trophy: false})}
            />
        </FormControl>
        <FormControl className={classes.field}>
            <FormLabel>Trophy</FormLabel>
            <Switch
                color={"primary"}
                checked={Boolean(race?.Trophy || false)}
                onChange={(e) => setRace({...race, Trophy: e.target.checked, VCVEvent: false, Interclub: false, ClubChamps: false})}
            />
        </FormControl>
        <FormControl className={classes.field}>
            <FormLabel>Club Championship</FormLabel>
            <Switch
                color={"primary"}
                checked={Boolean(race?.ClubChamps || false)}
                onChange={(e) => setRace({...race, ClubChamps: e.target.checked, VCVEvent: false, Interclub: false, Trophy: false})}
            />
        </FormControl>

        <TextField {...defaultFieldProps}
                   label={"Registration URL"}
                   value={race?.RegistrationURL || ""}
                   onChange={(e) => setRace({...race, RegistrationURL: e.target.value})}
        />

        <FormControl className={classes.field} fullWidth={true}>
            <Button variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
        </FormControl>
    </Paper>

}

export async function getStaticProps(props) {
    return {props}
}

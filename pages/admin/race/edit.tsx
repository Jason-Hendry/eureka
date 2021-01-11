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
    Select, Switch, TextFieldProps, Drawer, TextareaAutosize
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {
    CourseListFetcher,
    DocPutRaces, ImageListFetcher,
    RaceFetcher,
    UserListFetcher
} from "../../../services/APIService";
import {Race, RaceData, RaceFormat} from "../../../models/Race";
import useSWR, {mutate} from "swr";
import {CourseList} from "../../../models/Course";
import {UserList} from "../../../models/User";
import {Image, ImageList} from "../../../models/Image";
import {ImageSelector} from "../../../components/ImageSelector";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    field: {
        // marginBottom: theme.spacing(4),
        // marginLeft: theme.spacing(2)
    },
    raceImage: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
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
    const {data} = useSWR<Race>(key, RaceFetcher)
    const [edit, setEdit] = useState<RaceData>(null)

    const race: RaceData = {...data?.data, ...edit}

    const courseListSWR = useSWR<CourseList>(`/api/Courses?secret=${secret}`, CourseListFetcher)
    const userListSWR = useSWR<UserList>(`/api/User?secret=${secret}`, UserListFetcher)
    const courseList = courseListSWR?.data
    const userList = userListSWR?.data

    const setRace = (raceData) => {
        setEdit(raceData)
        mutate(key, {...data, data: raceData}, false).catch(e => console.log(e))
    }

    const [btnLabel, setBtnLabel] = useState<string>("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutRaces(race, id, secret).then(() => {
            setBtnLabel("Save")
            router.push("/admin/races").catch(e => console.log("Route change failed: ", e))
        }).catch(() => setBtnLabel("Failed"));
    }

    const addImage = (image: Image) => {
        const Images = edit ? edit.Images : [];
        Images.push(image)
        setEdit({...edit, Images})
    }

    const CourseItemList = courseList ? courseList.map(c => <MenuItem key={c.id}
                                                                      value={c.id}>{c.data.Title}</MenuItem>) : null;
    const UserItemList = userList ? userList.map(c => <MenuItem key={c.id}
                                                                value={c.id}>{c.data.name}</MenuItem>) : null;
    const RaceFormatItemList = Object.keys(RaceFormat).map(key => <MenuItem key={key}
                                                                            value={key}>{RaceFormat[key]}</MenuItem>)

    const defaultFieldProps: TextFieldProps = {
        className: classes.field,
        fullWidth: true,
        InputLabelProps: {shrink: true},
        margin: "normal"
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit
            Race</Typography></Toolbar>
        <form onSubmit={e => e.preventDefault()}>
            <TextField {...defaultFieldProps}
                       label={'Race Date'}
                       value={race?.Date || ""}
                       onChange={(e) => setRace({...race, Date: e.target.value})}
                       type={"date"}
            />

            <FormControl className={classes.field} margin={"normal"}>
                <FormLabel>Cancelled</FormLabel>
                <Switch
                    color={"secondary"}
                    checked={Boolean(race?.Cancelled || false)}
                    onChange={(e) => setRace({...race, Cancelled: e.target.checked, Postponed: false})}
                />
            </FormControl>
            <FormControl className={classes.field} margin={"normal"}>
                <FormLabel>Postponed</FormLabel>
                <Switch
                    color={"secondary"}
                    checked={Boolean(race?.Postponed || false)}
                    onChange={(e) => setRace({...race, Postponed: e.target.checked, Cancelled: false})}
                />
            </FormControl>

            <FormControl className={classes.field} fullWidth={true} margin={"normal"}>
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

            <FormControl className={classes.field} fullWidth={true} margin={"normal"}>
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

            <FormControl className={classes.field} fullWidth={true} margin={"normal"}>
                <FormLabel>Marshalls</FormLabel>
                <Select
                    fullWidth={true}
                    multiple={true}
                    value={race?.Marshalls || []}
                    onChange={(e) => setRace({...race, Marshalls: e.target.value})}>
                    {UserItemList}
                </Select>
            </FormControl>


            <FormControl className={classes.field} margin={"normal"}>
                <FormLabel>VCV Event</FormLabel>
                <Switch
                    color={"primary"}
                    checked={Boolean(race?.VCVEvent || false)}
                    onChange={(e) => setRace({
                        ...race,
                        VCVEvent: e.target.checked,
                        ClubChamps: false,
                        Interclub: false,
                        Trophy: false
                    })}
                />
            </FormControl>
            <FormControl className={classes.field} margin={"normal"}>
                <FormLabel>Interclub</FormLabel>
                <Switch
                    color={"primary"}
                    checked={Boolean(race?.Interclub || false)}
                    onChange={(e) => setRace({
                        ...race,
                        Interclub: e.target.checked,
                        VCVEvent: false,
                        ClubChamps: false,
                        Trophy: false
                    })}
                />
            </FormControl>
            <FormControl className={classes.field} margin={"normal"}>
                <FormLabel>Trophy</FormLabel>
                <Switch
                    color={"primary"}
                    checked={Boolean(race?.Trophy || false)}
                    onChange={(e) => setRace({
                        ...race,
                        Trophy: e.target.checked,
                        VCVEvent: false,
                        Interclub: false,
                        ClubChamps: false
                    })}
                />
            </FormControl>
            <FormControl className={classes.field} margin={"normal"}>
                <FormLabel>Club Championship</FormLabel>
                <Switch
                    color={"primary"}
                    checked={Boolean(race?.ClubChamps || false)}
                    onChange={(e) => setRace({
                        ...race,
                        ClubChamps: e.target.checked,
                        VCVEvent: false,
                        Interclub: false,
                        Trophy: false
                    })}
                />
            </FormControl>

            <TextField {...defaultFieldProps}
                       label={"Registration URL"}
                       value={race?.RegistrationURL || ""}
                       onChange={(e) => setRace({...race, RegistrationURL: e.target.value})}
            />

            <TextField {...defaultFieldProps}
                       multiline={true}
                       inputProps={{inputComponent: TextareaAutosize}}
                       label={'Notes'}
                       helperText={"Use 2 new lines to create a new paragraph."}
                       onChange={(e) => setRace({...race, Notes: e.target.value})}
                       value={race?.['Notes'] || ""} InputLabelProps={{shrink: true}} fullWidth={true}/>


            <FormControl margin={"normal"} className={classes.field}>
                <FormLabel>Images</FormLabel>

                {race.Images ? race.Images.map((i,k) => <img className={classes.raceImage} key={k} src={i.data.admin}/>) : null}

                <ImageSelector addImage={addImage} />
            </FormControl>

            <FormControl className={classes.field} fullWidth={true} margin={"normal"}>
                <Button type={"submit"} variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
            </FormControl>
        </form>
    </Paper>

}

export async function getStaticProps(props) {
    return {props:{}}
}

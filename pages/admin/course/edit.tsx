import React, {useContext, useEffect, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {CourseFetcher, DocGetCourse, DocPutCourse, DocPutRaces, RaceFetcher} from "../../../services/APIService";
import {Course, CourseData} from "../../../models/Course";
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

export default function EditCourse() {
    const classes = useStyles();
    const router = useRouter();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#','') : "";
    const key = `/api/Courses/${id}?secret=${secret}`
    const {data, error} = useSWR<Course>(key, CourseFetcher)
    const course = data?.data

    const setCourse = (couseData: CourseData) => {
        mutate(key, {...data, data:couseData}, false)
    }

    const [btnLabel, setBtnLabel] = useState("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutCourse(course, id, secret).then(e => {
            setBtnLabel("Save")
            router.push("/admin/courses")
        }).catch(e => setBtnLabel("Failed"));
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit Course</Typography></Toolbar>

        <TextField className={classes.field} variant={"standard"}
                   label={'Title'}
                   onChange={(e) => setCourse({...course, Title: e.target.value})}
                   value={course?.['Title'] || ""} InputLabelProps={{shrink: true}} fullWidth={true} />


        <Button variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper>

}
export async function getStaticProps(props) {
    return {props}
}
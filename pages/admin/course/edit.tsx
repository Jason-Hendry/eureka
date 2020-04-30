import React, {useContext, useEffect, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {DocGetCourse, DocPutCourse} from "../../../services/DocumentService";
import {CourseData} from "../../../models/Course";

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

function Course() {
    const secret = useContext(Secret);
    const classes = useStyles();
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)

    const [course, setCourse] = useState<CourseData>({Title:""})
    const [btnLabel, setBtnLabel] = useState("Save")

    const [id, setId] = useState("")
    useEffect(() => setId(document.location.hash.replace('#','')))

    if(process.browser && id && !loaded) {

        setLoaded(true)

        DocGetCourse(id, secret).then(r => {
            setCourse(r.data)
        }).catch((err) => {
            // console.log('Course.ts: ', err)
            setCourse({"Title":"Error"})
        })
    }

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
export default Course

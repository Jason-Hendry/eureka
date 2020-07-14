import React, {useContext, useEffect, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, FormControl, FormLabel, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {CourseFetcher, DocGetCourse, DocPutCourse, DocPutRaces, RaceFetcher} from "../../../services/APIService";
import {Course, CourseData} from "../../../models/Course";
import useSWR, {mutate} from "swr";
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

export default function EditCourse() {
    const classes = useStyles();
    const router = useRouter();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#', '') : "";
    const key = `/api/Courses/${id}?secret=${secret}`
    const {data, error} = useSWR<Course>(key, CourseFetcher)
    const course = data?.data

    const setCourse = (couseData: CourseData) => {
        mutate(key, {...data, data: couseData}, false)
    }

    const addImage = (image: Image) => {
        const Images = course?.Images || [];
        Images.push(image)
        setCourse({...course, Images})
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
                   value={course?.['Title'] || ""} InputLabelProps={{shrink: true}} fullWidth={true}/>

        <TextField className={classes.field} variant={"standard"}
                   label={'Lap Distance (Kms)'}
                   type={'number'}
                   onChange={(e) => setCourse({...course, LapDistance: parseFloat(e.target.value)})}
                   value={course?.LapDistance} InputLabelProps={{shrink: true}} fullWidth={true}/>


        <FormControl margin={"normal"} className={classes.field}>
            <FormLabel>Images</FormLabel>

            {course?.Images ? course.Images.map((i, k) => <img className={classes.image} key={k}
                                                          src={i.data.admin}/>) : null}

            <ImageSelector addImage={addImage}/>
        </FormControl>

        <Button fullWidth={true} variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper>

}

export async function getStaticProps(props) {
    return {props}
}

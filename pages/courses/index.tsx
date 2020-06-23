import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {createStyles} from "@material-ui/styles";
import {Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {DocListCourses} from "../../services/DirectService";
import Link from "next/link";
import {sortByTitle} from "../../services/sort";
import PublicLayout from "../../layouts/public";
import {CourseList} from "../../models/Course";

const useStyles = makeStyles((theme) => createStyles({
    raceCard: {
        marginBottom: theme.spacing(2)
    },
}));

interface Props {
    courses: CourseList
}

// Sections for this page
export default function CoursePage({courses}: Props) {
    const classes = useStyles();

    const CourseList = courses.map(n => {
        const course = n.data;
        // const displayDate = ISODateToPretty(news.Date)
        const url = "/courses/" + n.id
        return <Grid item xs={12} md={6} lg={4}><Card className={classes.raceCard} key={n.id}>
            <CardHeader title={course.Title}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {course.LapDistance}Km
                </Typography>
                <Link href={url}><a>View Course</a></Link>
            </CardContent>
        </Card></Grid>
    })

    return <PublicLayout small={true} heroImage={require("../../assets/img/bg3.jpg")} title={"Courses"}>
        <Grid container spacing={2}>
            {CourseList}
        </Grid>
    </PublicLayout>
}

export async function getStaticProps() {
    const courses = (await DocListCourses(process.env.FAUNADB_SECRET)).sort(sortByTitle)

    return {props: {courses}}
}
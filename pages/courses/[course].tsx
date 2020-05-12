import {DocGetCourse, DocListCourses} from "../../services/DirectService";
import React from "react";
import PublicLayout from "../../layouts/public";
import {CourseData} from "../../models/Course";

interface Props {
    course: CourseData
}

export default function Course({course: {Title, LapDistance}}: Props) {

    const Body = <div>
        <h1>Course</h1>

        <p>Lap Distance: {LapDistance}Km</p>
    </div>

    return <PublicLayout small={true} title={Title} heroImage={require("assets/img/bg3.jpg")}>{Body}</PublicLayout>
}

export async function getStaticProps({params: {course}}): Promise<{ props: Props }> {
    const courseData = await DocGetCourse(course, process.env.FAUNADB_SECRET)
    return {props: {course: courseData.data}}
}

export async function getStaticPaths() {
    const paths = (await DocListCourses(process.env.FAUNADB_SECRET)).map(c => {
        return {params: {course: c.id}}
    })
    return {
        paths,
        fallback: false
    }
}

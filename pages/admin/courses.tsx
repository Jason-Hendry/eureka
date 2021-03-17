import React, {FC} from "react"
import {
    Container,
    Paper,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {CoursesCollectionApi} from "../../services/APIService";
import {sortByTitle} from "../../services/sort";
import Link from "next/link";
import {useAdminListHooks} from "../../effects/loadApiEffect";

export const AdminIndex: FC<unknown> = () => {
    const {list: courses} = useAdminListHooks(CoursesCollectionApi)

    return <Paper>
        <Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant={"head"}><Typography variant={"h6"}>Courses</Typography></TableCell>
                            <TableCell variant={"head"} align={"right"}><Link href={"/admin/course"}>Add New
                                Course</Link></TableCell>
                        </TableRow>
                    </TableHead>
                    {courses.sort(sortByTitle).map(course => (
                        <TableRow key={course.id}>
                            <TableCell>{course.data.Title}</TableCell>
                            <TableCell align={"right"}><Link href={`/admin/course#${course.id}`}>Edit</Link></TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
        </Container>
    </Paper>

}

export default AdminIndex

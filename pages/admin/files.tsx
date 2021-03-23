import React, {FC, useContext, useEffect, useState} from "react"
import {
    Button,
    Checkbox,
    Container, FormControlLabel,
    Paper,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {CoursesCollectionApi, FilesCollectionApi, RaceCollectionApi} from "../../services/APIService";
import {Secret} from "../../layout/Admin/Secret";
import {dateSortCompareOldestFirst, sortByFilename, sortByTitle, thisYear} from "../../services/sort";
import {FilterFutureRace, Race, RaceData} from "../../models/Race";
import {BaseList, BaseModel} from "../../models/base";
import Link from "next/link";
import {CourseData, GetCourse} from "../../models/Course";
import Columns, {Third} from "../../layout/columns/Columns";
import {FileData} from "../../models/File";
import {useAdminListHooks} from "../../effects/loadApiEffect";


export const AdminIndex:FC<unknown> = () => {
    const {list: files} = useAdminListHooks(FilesCollectionApi)
    return <Paper>
        <Container>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant={"head"}><Typography variant={"h6"}>Files</Typography></TableCell>
                            <TableCell variant={"head"} align={"right"}><Link href={"/admin/file"}>Add New File</Link></TableCell>
                        </TableRow>
                    </TableHead>
                    {files.sort(sortByFilename).map(course => (
                        <TableRow key={course.id}>
                            <TableCell>{course.data.filename}</TableCell>
                            <TableCell align={"right"}><Link href={`/admin/file#${course.id}`}>Edit</Link></TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
        </Container>
    </Paper>

}

export default AdminIndex

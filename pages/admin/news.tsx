import React, {FC, useContext, useEffect, useState} from "react"
import {
    Button,
    Checkbox,
    Container, FormControlLabel,
    Paper, Snackbar,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {
    CoursesCollectionApi,
    ImagesCollectionApi,
    NewsCollectionApi,
    RaceCollectionApi
} from "../../services/APIService";
import {Secret} from "../../layout/Admin/Secret";
import {dateSortCompareOldestFirst, sortByTitle, thisYear} from "../../services/sort";
import {FilterFutureRace, Race, RaceData} from "../../models/Race";
import {BaseList, BaseModel} from "../../models/base";
import Link from "next/link";
import {CourseData, GetCourse} from "../../models/Course";
import Three, {ColumnThird} from "../../layout/columns/Three";
import {NewsData} from "../../models/News";
import {useAdminListHooks} from "../../effects/loadApiEffect";


export const AdminIndex: FC<unknown> = () => {
    const {list: news} = useAdminListHooks(NewsCollectionApi)

    return <Paper>
        <Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant={"head"}><Typography variant={"h6"}>News</Typography></TableCell>
                            <TableCell variant={"head"} align={"right"}><Link href={"/admin/newsItem"}>Add New
                                Article</Link></TableCell>
                        </TableRow>
                    </TableHead>
                    {news.sort(sortByTitle).map(n => (
                        <TableRow key={n.id}>
                            <TableCell>{n.data.Title}</TableCell>
                            <TableCell align={"right"}><Link href={`/admin/newsItem#${n.id}`}>Edit</Link></TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
        </Container>
    </Paper>

}

export default AdminIndex

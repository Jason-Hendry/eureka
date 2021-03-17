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
import {CoursesCollectionApi, RaceCollectionApi, UserCollectionApi} from "../../services/APIService";
import {Secret} from "../../layout/Admin/Secret";
import {dateSortCompareOldestFirst, sortByName, sortByTitle, thisYear} from "../../services/sort";
import {FilterFutureRace, Race, RaceData} from "../../models/Race";
import {BaseList, BaseModel} from "../../models/base";
import Link from "next/link";
import {CourseData, GetCourse} from "../../models/Course";
import Three, {ColumnThird} from "../../layout/columns/Three";
import {useAdminListHooks} from "../../effects/loadApiEffect";
import {UserData} from "../../models/User";


export const AdminUsers: FC<unknown> = () => {
    const {list: users} = useAdminListHooks<UserData>(UserCollectionApi)

    return <Paper>
        <Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant={"head"}><Typography variant={"h6"}>Users</Typography></TableCell>
                            <TableCell variant={"head"}>email</TableCell>
                            <TableCell variant={"head"} align={"right"}><Link href={"/admin/user"}>Add New
                                User</Link></TableCell>
                        </TableRow>
                    </TableHead>
                    {users.sort(sortByName).map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.data.name}</TableCell>
                            <TableCell>{user.data.email}</TableCell>
                            <TableCell align={"right"}><Link href={`/admin/user#${user.id}`}>Edit</Link></TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
        </Container>
    </Paper>
}

export default AdminUsers

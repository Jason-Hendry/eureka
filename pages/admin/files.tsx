import React, {FC, useContext, useEffect, useState} from "react"
import {
    Container,
    Paper,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {FilesCollectionApi} from "../../services/APIService";
import {sortByFilename} from "../../services/sort";
import Link from "next/link";
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

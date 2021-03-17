import React, {FC, useContext, useEffect, useState} from "react"
import {
    Container,
    Paper,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {ImagesCollectionApi} from "../../services/APIService";
import {sortByFilename} from "../../services/sort";
import Link from "next/link";
import {useAdminListHooks} from "../../effects/loadApiEffect";


export const AdminIndex: FC<unknown> = () => {
    const {list: images} = useAdminListHooks(ImagesCollectionApi)
    return <Paper>
        <Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant={"head"}><Typography variant={"h6"}>Images</Typography></TableCell>
                            <TableCell variant={"head"} align={"right"}><Link href={"/admin/image"}>Add New
                                Image</Link></TableCell>
                        </TableRow>
                    </TableHead>
                    {images.sort(sortByFilename).map(image => (
                        <TableRow key={image.id}>
                            <TableCell>{image.data.filename}</TableCell>
                            <TableCell align={"right"}><Link href={`/admin/image#${image.id}`}>Edit</Link></TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
        </Container>
    </Paper>
}

export default AdminIndex

import React, {FC} from "react"
import {
    Container,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import {
    NewsCollectionApi,
} from "../../services/APIService";
import {sortByTitle} from "../../services/sort";
import Link from "next/link";
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
                    <TableBody>
                    {news.sort(sortByTitle).map(n => (
                        <TableRow key={n.id}>
                            <TableCell>{n.data.Title}</TableCell>
                            <TableCell align={"right"}><Link href={`/admin/newsItem#${n.id}`}>Edit</Link></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </Paper>
}

export default AdminIndex


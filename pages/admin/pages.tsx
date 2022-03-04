import React, {FC} from "react"
import {
    Container,
    Paper,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import {PageCollectionApi} from "../../services/APIService";
import {sortByUrl} from "../../services/sort";
import Link from "next/link";
import {useAdminListHooks} from "../../effects/loadApiEffect";


export const AdminUsers: FC<unknown> = () => {
    const {list: pages} = useAdminListHooks(PageCollectionApi)

    return <Paper>
        <Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant={"head"}><Typography variant={"h6"}>Url</Typography></TableCell>
                            {/*<TableCell variant={"head"}>email</TableCell>*/}
                            <TableCell variant={"head"} align={"right"}><Link href={"/admin/page"}>Add New
                                Page</Link></TableCell>
                        </TableRow>
                    </TableHead>
                    {pages.sort(sortByUrl).map(page => (
                        <TableRow key={page.id}>
                            <TableCell>{page.data.url}</TableCell>
                            <TableCell align={"right"}><Link href={`/admin/page#${page.id}`}>Edit</Link></TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
        </Container>
    </Paper>
}

export default AdminUsers

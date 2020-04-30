import React, {useContext, useState} from "react"
import {useRouter} from "next/router";
import Link from "next/link";
import {Secret} from "../../components/AdminTheme/Secret";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Theme, Toolbar,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {DocListUsers, DocPostUser} from "../../services/DocumentService";
import {UserList} from "../../models/User";

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        '&:hover': {
            background: theme.palette.action.hover,
        }
    },
    heading: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    tableHeading: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    newUser: {
        marginRight: theme.spacing(1)
    }
}))

export default function Index(props) {
    const secret = useContext(Secret)
    const [users, setUsers] = useState<UserList>([])
    const classes = useStyles()
    const router = useRouter()

    if (process.browser) {
        if (users.length === 0) {
            DocListUsers(secret).then(list => setUsers(list)).catch(e => setUsers([]))
        }
    }

    const newUser = () => {
        DocPostUser( {email:""}, secret).then(({id}) => router.push(`/admin/user/${id}`)).catch(e => {});
    }

    const list = users.map((r, i) => {
        console.log(r)
        return <TableRow key={i} className={classes.row}>
            <TableCell>{r.data.email}</TableCell>
            <TableCell>
                <Button variant={"text"}><Link href={"/admin/user/" + r.id}>Edit</Link></Button>
            </TableCell>
        </TableRow>
    })

    return <TableContainer component={Paper}>
            <Toolbar className={classes.tableHeading}>
                <Typography variant={"h6"} component={"div"}>Manage Users</Typography>
                <Button variant={"contained"} color={"primary"} className={classes.newUser} onClick={newUser}>New User</Button>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell variant={"head"}>Title</TableCell>
                        <TableCell variant={"head"}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list}
                </TableBody>
            </Table>
        </TableContainer>

}

import React, {useContext, useEffect, useState} from "react"
import {useRouter} from "next/router";
import {RaceListService} from "../api/races";
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
import {DocPostService} from "../api/[collection]";

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
    newRace: {
        marginRight: theme.spacing(1)
    }
}))

export default function Index(props) {
    const secret = useContext(Secret)
    const [races, setRaces] = useState([])
    const classes = useStyles()
    const router = useRouter()

    if (process.browser) {
        const c = useRouter()
        if (secret == "") {
            c.push("/admin/")
        }
        if (races.length === 0) {
            RaceListService(secret, setRaces, (e) => console.log(e))
        }
    }

    const newRace = () => {
        DocPostService("Races", {}, secret).then(({id}) => router.push(`/admin/race/${id}`)).catch(e => {});
    }

    const list = races.map((r, i) => {
        console.log(r)
        return <TableRow key={i} className={classes.row}>
            <TableCell>{r.data?.Date ?? "- no date -"}</TableCell>
            <TableCell>{r.data?.Title ? r.data.Title : '- No name -'}</TableCell>
            <TableCell>
                <Button variant={"text"}><Link href={"/admin/race/" + r.id}>Edit</Link></Button>
            </TableCell>
        </TableRow>
    })

    return <TableContainer component={Paper}>
            <Toolbar className={classes.tableHeading}>
                <Typography variant={"h6"} component={"div"}>Manage Ranges</Typography>
                <Button variant={"contained"} color={"primary"} className={classes.newRace} onClick={newRace}>New Race</Button>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell variant={"head"}>Date</TableCell>
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

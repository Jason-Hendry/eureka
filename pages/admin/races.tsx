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
import {DocListRaces, DocPostRaces, RaceListFetcher} from "../../services/APIService";
import {dateSortCompareOldestFirst} from "../../services/sort";
import useSWR from "swr"
import {race} from "q";
import {RaceData} from "../../models/Race";
import {Image} from "../../models/Image";

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
    const {data} = useSWR(`/api/Races?secret=${secret}`, RaceListFetcher)
    const classes = useStyles()
    const router = useRouter()

    const races = data ? data.sort(dateSortCompareOldestFirst) : []

    const newRace = () => {
        DocPostRaces( {Title:""}, secret).then(({id}) => router.push(`/admin/race/edit#${id}`)).catch(e => {});
    }

    const list = races.map((r, i) => {
        // console.log(r)
        return <TableRow key={i} className={classes.row}>
            <TableCell>{r.data?.Date ?? "- no date -"}</TableCell>
            <TableCell>{r.data?.Title ? r.data.Title : '- No name -'}</TableCell>
            <TableCell>
                <Button variant={"text"}><Link href={"/admin/race/edit#" + r.id}>Edit</Link></Button>
            </TableCell>
        </TableRow>
    })

    return <TableContainer component={Paper}>
            <Toolbar className={classes.tableHeading}>
                <Typography variant={"h6"} component={"div"}>Manage Races</Typography>
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
export async function getStaticProps(props) {
    return {props}
}

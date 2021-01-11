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
import {CourseListFetcher, DocPostRaces, RaceListFetcher} from "../../services/APIService";
import {dateSortCompareOldestFirst, thisYear} from "../../services/sort";
import useSWR from "swr"
import {Course} from "../../models/Course";
import {ISODateToPretty} from "../../services/dates";

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
    const coursesData = useSWR(`/api/Courses?secret=${secret}`, CourseListFetcher).data
    const classes = useStyles()
    const router = useRouter()

    const getCourse = (course: string): Course | undefined => {
        return coursesData?.find(c => c.id === course)
    }

    const races = data ? data.sort(dateSortCompareOldestFirst).filter(thisYear('2021')) : []

    const newRace = () => {
        DocPostRaces( {Title:""}, secret).then(({id}) => router.push(`/admin/race/edit#${id}`)).catch(e => {});
    }

    const list = races.map((r, i) => {
        // console.log(r)
        return <TableRow key={i} className={classes.row}>
            <TableCell>{ISODateToPretty(r.data?.Date) ?? "- no date -"}</TableCell>
            <TableCell>{r.data?.Title ? r.data.Title : getCourse(r.data.Course)?.data?.Title ?? '- No name -'}</TableCell>
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
    return {props: {}}
}

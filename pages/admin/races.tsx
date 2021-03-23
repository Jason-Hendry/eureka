import React, {FC, useEffect, useState} from "react"
import {
    Checkbox,
    Container, FormControlLabel,
    Paper,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {CoursesCollectionApi, RaceCollectionApi} from "../../services/APIService";
import {dateSortCompareOldestFirst, thisYear} from "../../services/sort";
import {FilterFutureRace, RaceData} from "../../models/Race";
import {BaseList, BaseModel} from "../../models/base";
import Link from "next/link";
import {CourseData, GetCourse} from "../../models/Course";
import {useAdminListHooks} from "../../effects/loadApiEffect";


export const AdminIndex:FC<unknown> = () => {

    const {list: upcomingRaces, secret} = useAdminListHooks(RaceCollectionApi)
    const [courses, setCourses] = useState<BaseList<CourseData>>([])

    const year = (new Date()).getFullYear();

    useEffect(() => {
        CoursesCollectionApi(secret).list().then(setCourses)
    }, [secret])

    const [ hidePrevious, setHidePrevious ] = useState<boolean>(true);
    const hidePreviousFilter = (a: BaseModel<RaceData>): boolean => {
        return hidePrevious? FilterFutureRace()(a) : true
    }

    return <Paper>
        <Container>
            <br/>
            <Typography variant={"h5"}>{year} Races</Typography>
            <br/>
            <FormControlLabel
                control={<Checkbox checked={hidePrevious} onChange={e => setHidePrevious(e.target.checked)} />}
                label="Hide Past Events"
            />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell variant={"head"}>Date</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Course</TableCell>
                                    <TableCell variant={"head"} align={"right"}><Link href={"/admin/race"}>Add New Race</Link></TableCell>
                                </TableRow>
                            </TableHead>
                        {upcomingRaces.sort(dateSortCompareOldestFirst).filter(thisYear(year)).filter(hidePreviousFilter).map(race => (
                            <TableRow>
                                <TableCell>{race.data.Date}</TableCell>
                                <TableCell>{race.data.Title || race.data.RaceFormat}</TableCell>
                                <TableCell>{GetCourse(courses, race.data.Course || '')?.Title}</TableCell>
                                <TableCell align={"right"}><Link href={`/admin/race#${race.id}`}>Edit</Link></TableCell>
                            </TableRow>
                    ))}
                        </Table>
                        </TableContainer>
        </Container>
    </Paper>

}

export default AdminIndex

import React, {FC, useContext, useEffect, useState} from "react"
import {Container, Paper, Typography} from "@material-ui/core";
import Columns, {Third} from "../../layout/columns/Columns";
import {CoursesCollectionApi, RaceCollectionApi, UserCollectionApi} from "../../services/APIService";
import {Secret} from "../../layout/Admin/Secret";
import {dateSortCompareOldestFirst, LimitFilter} from "../../services/sort";
import {FilterFutureRace, MergeCourseUserData, RaceMergeData} from "../../models/Race";
import {BaseList} from "../../models/base";
import RaceList from "../../components/RaceList";
import {CourseData} from "../../models/Course";
import {UserData} from "../../models/User";


export const AdminIndex:FC<unknown> = () => {
    const secret = useContext(Secret)
    const [upcomingRaces, setUpcomingRaces] = useState<BaseList<RaceMergeData>>([])
    useEffect(() => {
        const userData = UserCollectionApi(secret).list()
        const courseData = CoursesCollectionApi(secret).list()
        RaceCollectionApi(secret).list().then(races => {
            Promise.all<BaseList<CourseData>, BaseList<UserData>>([courseData, userData]).then(([c, u]) => {
                setUpcomingRaces(races.map(MergeCourseUserData(c, u)).sort(dateSortCompareOldestFirst).filter(FilterFutureRace()).filter(LimitFilter(5)));
            })
        });
    }, [secret])

    return <Paper>
        <Container>
            <Typography variant={"h6"}>Admin</Typography>
        <Columns>
            <Third>
                <Typography variant={"h4"}>Upcoming Races</Typography>
                <RaceList races={upcomingRaces} edit/>
            </Third>
        </Columns>
        </Container>
    </Paper>

}

export default AdminIndex

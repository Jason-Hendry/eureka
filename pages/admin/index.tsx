import React, {FC, useContext, useEffect, useState} from "react"
import {Container, Paper, Typography} from "@mui/material";
import Columns, {Third} from "../../layout/columns/Columns";
import {CoursesCollectionApi, RaceCollectionApi, UserCollectionApi} from "../../services/APIService";
import {Secret} from "../../layout/Admin/Secret";
import {dateSortCompareOldestFirst, LimitFilter} from "../../services/sort";
import {FilterFutureRace, MergeCourseUserData, RaceMergeData} from "../../models/Race";
import {BaseList} from "../../models/base";
import RaceList from "../../components/RaceList";

function noop() {

}

export const AdminIndex:FC<unknown> = () => {
    const secret = useContext(Secret)
    const [upcomingRaces, setUpcomingRaces] = useState<BaseList<RaceMergeData>>([])
    useEffect(() => {
        const userData = UserCollectionApi(secret).list()
        const courseData = CoursesCollectionApi(secret).list()
        let doSetUpcomingRaces = (data: BaseList<RaceMergeData>) => setUpcomingRaces(data)

        RaceCollectionApi(secret).list().then(races => {
            Promise.all([courseData, userData]).then(([c, u]) => {
                doSetUpcomingRaces(races.map(MergeCourseUserData(c, u)).sort(dateSortCompareOldestFirst).filter(FilterFutureRace()).filter(LimitFilter(5)));
            })
        });
        return () => {
            // Prevents setState calls if components unmounted before data is returned
            doSetUpcomingRaces = noop
        }
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

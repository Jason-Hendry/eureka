import React, {FC, useContext, useEffect, useState} from "react"
import {Button, Card, CardActions, CardHeader, Container, Paper, Typography} from "@material-ui/core";
import Three, {ColumnThird} from "../../layout/columns/Three";
import {RaceCollectionApi} from "../../services/APIService";
import {Secret} from "../../layout/Admin/Secret";
import {dateSortCompareOldestFirst, LimitFilter} from "../../services/sort";
import {FilterFutureRace, RaceData} from "../../models/Race";
import {BaseList} from "../../models/base";
import Link from "next/link";


export const AdminIndex:FC<unknown> = () => {
    const secret = useContext(Secret)
    const [upcomingRaces, setUpcomingRaces] = useState<BaseList<RaceData>>([])
    useEffect(() => {
        RaceCollectionApi(secret).list().then(races =>
            setUpcomingRaces(races.sort(dateSortCompareOldestFirst).filter(FilterFutureRace()).filter(LimitFilter(5))))
    }, [secret])

    return <Paper>
        <Container>
            <Typography variant={"h6"}>Admin</Typography>
        <Three>
            <ColumnThird>
                <Typography variant={"h4"}>Upcoming Races</Typography>
                {upcomingRaces.map(race => (
                    <Card key={race.id} >
                        <CardHeader>{race.data.Title} - {race.data.Date}</CardHeader>
                        <CardActions>
                            <Link href={`/admin/race#${race.id}`}>Edit</Link>
                        </CardActions>
                    </Card>
                ))}
            </ColumnThird>
        </Three>
        </Container>
    </Paper>

}

export default AdminIndex

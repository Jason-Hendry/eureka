import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import InfoArea from "../components/InfoArea/InfoArea";
import EventIcon from '@material-ui/icons/Event';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import {DocListCourses, DocListNews, DocListRaces, DocListUsers} from "../services/DirectService";
import {FilterFutureRace, MergeCourseUserData, RaceList} from "../models/Race";
import {Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {dateSortCompareNewestFirst, dateSortCompareOldestFirst, LimitFilter} from "../services/sort";
import {ISODateToPretty} from "../services/dates";
import Link from "next/link";
import {FilterHasDate, NewsList} from "../models/News";
import {toURL} from "../services/url";
import PublicLayout from "../layouts/public";

const cvc = require("../assets/img/vcv.svg")


const Sentry = process.browser ? require('@sentry/browser') : require('@sentry/node');
// or use es6 import statements
// import * as Sentry from '@sentry/node';

Sentry.init({ dsn: 'https://d0e7c686f2b5418c92caa122fe59794a@o391192.ingest.sentry.io/5236909', environment: process.env.SENTRY_ENV });

const useStyles = makeStyles((theme) => ({
    races: {
        marginBottom: theme.spacing(2),
        textAlign: "left"
    },
    news: {
        marginBottom: theme.spacing(2),
        textAlign: "left"
    }
}));

export default function LandingPage(props) {
    const classes = useStyles();
    const {races, news}: { races: RaceList, news: NewsList } = props;

    const nextRaces = races.map(r => {
        const vcv = r.data?.VCVEvent ?
            <a href={"http://www.veterancycling.com.au/events.html"} title="VCV Events" target="_blank"><img
                alt={"VCV Event"} height={50}
                src={cvc}/></a> : null

        return <Card className={classes.races} key={r.id}>
            <CardHeader title={r.data.Title} subheader={r.data?.Date} action={vcv}/>
            <CardContent>
                {r.data?.CourseData?.data?.Title}
            </CardContent>
        </Card>
    })

    const NewsList = news.map(n => {
        const news = n.data;
        const displayDate = ISODateToPretty(news.Date)
        const url = "/news/" + toURL(n.id)
        return <Card className={classes.news} key={n.id}>
            <CardHeader title={news.Title} subheader={displayDate}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {news.Teaser}
                </Typography>
                <Link href={url}><a>Read More</a></Link>
            </CardContent>
        </Card>
    })

    const leadP = `The Eureka Cycling Club was formed at the beginning of 2009 by a small group of
                                cyclists who believed there was a need for the type of racing that only a veterans club
                                can offer.`

    return <PublicLayout title={"Eureka Cycling Club"} leadParagraph={leadP} heroImage={require("assets/img/bg3.jpg")}>
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <InfoArea
                        title="Latest News"
                        description="..."
                        icon={AnnouncementIcon}
                        iconColor="info"
                        vertical
                    />
                    {NewsList}
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <InfoArea
                        title="Upcoming Races"
                        description="..."
                        icon={EventIcon}
                        iconColor="success"
                        vertical
                    />
                    {nextRaces}
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <InfoArea
                        title="Race Results"
                        description="..."
                        icon={DirectionsBikeIcon}
                        iconColor="danger"
                        vertical
                    />
                </Grid>
            </Grid>
        </div>
    </PublicLayout>
}


export async function getStaticProps() {

    const courses = await DocListCourses(process.env.FAUNADB_SECRET)
    const users = await DocListUsers(process.env.FAUNADB_SECRET)

    const races = (await DocListRaces(process.env.FAUNADB_SECRET))
        .filter(FilterFutureRace())
        .map(MergeCourseUserData(courses, users))
        .sort(dateSortCompareOldestFirst)
        .filter(LimitFilter(3))

    const news = (await DocListNews(process.env.FAUNADB_SECRET))
        .filter(FilterHasDate())
        .sort(dateSortCompareNewestFirst)
        .filter(LimitFilter(3))


    return {props: {races, news}}

}



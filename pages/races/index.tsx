import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {format, parse} from 'date-fns'

import {createStyles} from "@material-ui/styles";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import {DocListRaces, DocListCourses, DocListUsers} from "../../services/DirectService";
import {FilterFutureRace, MergeCourseUserData, Race, RaceList} from "../../models/Race";
import {dateSortCompareOldestFirst} from "../../services/sort";
import PublicLayout from "../../layouts/public";
import {Image} from "../../models/Image";

const cvc = require("../../assets/img/vcv.svg")
const eurekaLogo = require("../../assets/img/eureka-logo.svg")
const trophy = require("../../assets/img/Trophy.svg")
const interclub = require("../../assets/img/victoria.svg")

const useStyles = makeStyles((theme) => createStyles({

    description: {
        color: "#999"
    },
    raceTitle: {
        display: "block"
    },
    marshal: {
        paddingRight: theme.spacing(1)
    },
    raceCard: {
        marginBottom: theme.spacing(2),
        overflow: "normal",
        CardHeader: {
            textAlign: 'left',
            title: {

            }
        },
        CardContent: {
            textAlign: 'left',
        },
        "CardHeader-title": {
            backgroundColor: "#fd7b7b",
            display: 'inline-block',
            padding: "8px 24px",
// display: inline-block;
// padding: 8px 24px;
// margin: -90px 0 0 0;
// position: relative;
// top: -21px;
// box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
// font-weight: bold;
        }

    },
    Criterium: {
        backgroundColor: "#fd7b7b",
    },
    Handicap: {
        backgroundColor: "#7bd0fd",
    },
    GradedPointsRace: {
        backgroundColor: "#ffcd47",
    },
    Graded: {
        backgroundColor: "#5ae54e",
    },
    TimeTrial: {
        backgroundColor: "#f840c9",
    },
    Cancelled: {
        backgroundColor: "#ff9191",
    },
    Postponed: {
        backgroundColor: "#ffba88",
    },
    TitleCancelled: {
        color: "#ff0000",
        fontWeight: 700
    },
    TitlePostponed: {
        color: "#ff6c00",
        fontWeight: 700
    }
}));

interface Props {
    races: RaceList
}

// Sections for this page
export default function RacePage(props: Props) {
    const classes = useStyles();
    const {races} = props;

    const firstImage = races.reduce<Image>((p, r) => p || ((r.data.Images && r.data.Images.length > 0) ? r.data.Images[0] : null), null)

    const RaceList = races.map(r => {
        console.log(r.data.Date)

        const vcv = r.data?.VCVEvent ?
            <a href={"http://www.veterancycling.com.au/events.html"} title="VCV Events" target="_blank"><img
                alt={"Veteran Cycling Victoria"} height={50}
                src={cvc}/></a> :
            r.data?.ClubChamps ?
                <img alt={"Eureka Club Championship"} height={50} src={eurekaLogo}/> :
            r.data?.Trophy ?
                <img alt={"Eureka Trophy"} height={50} src={trophy}/> :
            r.data?.Interclub ?
                <img alt={"Interclub Raec"} height={30} src={interclub}/> : null

        const laps = r.data?.CourseLaps ? r.data?.CourseLaps : 0
        const lapsDistance = laps && r.data?.CourseData?.data?.LapDistance ? laps * r.data?.CourseData?.data?.LapDistance : 0
        const lapDisTab = lapsDistance ? <span> - {lapsDistance}Km ({laps} Laps)</span> : laps ?
            <span>({laps} Laps)</span> : null;

        const headerClass = r.data?.Cancelled ? classes.Cancelled :
            r.data?.Postponed ? classes.Postponed : null;

        const RaceTitlePrefix = r.data?.VCVEvent ? <strong>VCV Event - </strong> : null;

        const RaceTitleSuffix = r.data?.Cancelled ? <span className={classes.TitleCancelled}> - Cancelled</span> :
            r.data?.Postponed ? <span className={classes.TitlePostponed}> - Postponed (new date TBD)</span> :
                null;

        const RaceTitle = <span>{RaceTitlePrefix}{r.data.Title}{RaceTitleSuffix}</span>

        const raceDate = r.data.Date ? parse(r.data.Date, "yyyy-MM-dd", new Date()) : null;
        const day = raceDate ? format(raceDate, 'eeee MMM do') : null;
        const rf = r.data?.RaceFormat ? r.data.RaceFormat.substr(0, 1) : "-"
        const marshalList = r.data.MarshallNames.map((n, i) => <span className={classes.marshal} key={i}>{n}</span>)
        return <Card className={classes.raceCard} key={r.id}>
            <CardHeader className={headerClass} avatar={
                <Avatar aria-label="recipe" title={r.data?.RaceFormat} className={classes[r.data?.RaceFormat]}>
                    {rf}
                </Avatar>
            } title={RaceTitle} subheader={day} action={vcv}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {r.data.RaceFormat} - {r.data?.CourseData?.data?.Title}{lapDisTab}
                </Typography>
                {r.data.Notes ?
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Notes</strong>: {r.data.Notes}
                </Typography> : null }
                {marshalList.length ?
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Marshalls</strong>: {marshalList}
                </Typography> : null }
            </CardContent>
            {r.data?.RegistrationURL ? <CardActions>
                <Button variant={"contained"} color={"primary"} href={r.data?.RegistrationURL}>Register Online Now</Button>
            </CardActions> : null}
        </Card>
    })

    return <PublicLayout small={true} heroImage={firstImage ? firstImage.data.hero : require('../../assets/img/bg7.jpg')} title={"Eureka Race Calendar"}>
        {RaceList}
    </PublicLayout>
}

export async function getStaticProps() {
    const courses = await DocListCourses(process.env.FAUNADB_SECRET)
    const users = await DocListUsers(process.env.FAUNADB_SECRET)
    const races = (await DocListRaces(process.env.FAUNADB_SECRET))
        .filter(FilterFutureRace())
        .map<Race>(MergeCourseUserData(courses, users))
        .sort(dateSortCompareOldestFirst)
    return {props:{races}}
}

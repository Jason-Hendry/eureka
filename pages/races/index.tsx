import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {format, isFuture, parse} from 'date-fns'
// @material-ui/icons

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Parallax from "../../components/Parallax/Parallax.js";

import InfoArea from "../../components/InfoArea/InfoArea";
import EventIcon from '@material-ui/icons/Event';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AnnouncementIcon from '@material-ui/icons/Announcement';

const dashboardRoutes = [];

import {container, title} from "../../assets/jss/nextjs-material-kit.js";
import {createStyles} from "@material-ui/styles";
import {Avatar, Button, Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {DocListRaces, DocListCourses, DocListUsers} from "../../services/DirectService";
import {Race, RaceList} from "../../models/Race";

const useStyles = makeStyles((theme) => createStyles({
    container: {
        zIndex: 12,
        color: "#FFFFFF",
        ...container
    },
    title: {
        display: "inline-block",
        // position: "relative",
        marginTop: 30,
        minHeight: 32,
        color: "#FFFFFF",
        textDecoration: "none",
        ...title,
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px auto 0"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: 3
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    section: {
        padding: "70px 0",
    },
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
        marginBottom: theme.spacing(2)
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
    }
}));

interface Props {
    races: RaceList
}

// Sections for this page
export default function RacePage(props: Props) {
    const classes = useStyles();
    const {races, ...rest} = props;

    const RaceList = races.map(r => {
        console.log(r.data.Date)
        const raceDate = r.data.Date ? parse(r.data.Date, "yyyy-MM-dd", new Date()) : null;
        const day = raceDate ? format(raceDate, 'eeee MMM do') : null;
        const rf = r.data?.RaceFormat ? r.data.RaceFormat.substr(0,1) : "-"
        const marshalList = r.data.MarshallNames.map((n, i) => <span className={classes.marshal} key={i}>{n}</span>)
        return <Card className={classes.raceCard} key={r.id}>
            <CardHeader avatar={
                <Avatar aria-label="recipe" title={r.data?.RaceFormat} className={classes[r.data?.RaceFormat]}>
                    {rf}
                </Avatar>
            } title={r.data.Title} subheader={day} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {r.data.RaceFormat} - {r.data?.CourseData?.data?.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Marshalls: {marshalList}
                </Typography>
            </CardContent>

        </Card>
    })

    return (
        <div>
            <Header
                color="transparent"
                // routes={dashboardRoutes}
                brand=""
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax filter responsive image={require("assets/img/bg3.jpg")}>
                <div className={classes.container}>
                            <h1 className={classes.title}>Eureka Cycling Club</h1>
                            <h4>
                                The Eureka Veterans Cycling Club was formed at the beginning of 2009 by a small group of
                                cyclists who believed there was a need for the type of racing that only a veterans club
                                can offer.
                            </h4>
                            <br/>
                            <Button color="primary"
                                    variant={"contained"}
                                    size={"large"}
                                    href="void"
                                    target="_blank"
                                    rel="noopener noreferrer"
                            >Join Eureka</Button>

                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>

                                {RaceList}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export async function getStaticProps() {
    const courses = await DocListCourses(process.env.FAUNADB_SECRET)
    const users = await DocListUsers(process.env.FAUNADB_SECRET)
    const props = {
        races: await DocListRaces(process.env.FAUNADB_SECRET),

    }
    props.races = props.races.filter(r => {
        const raceDate = r.data?.Date ? parse(r.data.Date, "yyyy-MM-dd", new Date()) : null;
        return r.data !== undefined &&
            raceDate && isFuture(raceDate)
    }).map<Race>(r => {
        r.sortKey = parseInt(format(parse(r.data.Date, "yyyy-MM-dd", new Date()), 'yyyyDDD'))
        const courseData = courses.filter(c => c.id == r.data.Course).pop()
        if (courseData)  {
            r.data.CourseData = courseData
        }
        r.data.MarshallNames = r.data?.Marshalls ? users.filter(c => r.data.Marshalls.indexOf(c.id) != -1).map(u => u.data.name) : [];
        return r
    }).sort((a, b): number => {
        return a.sortKey - b.sortKey
    })
    console.log(props.races[0].data)
    return {props}
}

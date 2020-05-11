import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Parallax from "../components/Parallax/Parallax.js";

import styles from "../assets/jss/nextjs-material-kit/pages/landingPage";
import InfoArea from "../components/InfoArea/InfoArea";
import EventIcon from '@material-ui/icons/Event';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import {DocListCourses, DocListNews, DocListRaces, DocListUsers} from "../services/DirectService";
import {format, isFuture, parse} from "date-fns";
import {Race, RaceList} from "../models/Race";
import {Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {dateSortCompareNewestFirst, dateSortCompareOldestFirst} from "../services/sort";
import {ISODateToPretty} from "../services/dates";
import Link from "next/link";
import {NewsList} from "../models/News";
import {toURL} from "../services/url";

const cvc = require("../assets/img/vcv.svg")

// Sections for this page

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
    const classes = useStyles();
    const {races, news, ...rest}: {races:RaceList, news:NewsList} = props;

    // const raceList = races.sort((a,b) => a.sort-b.sort).map(r => <li>{r.Title} - {r.Course}</li>)

    const nextRaces = races.map(r => {
        const vcv = r.data?.VCVEvent ?
            <a href={"http://www.veterancycling.com.au/events.html"} title="VCV Events" target="_blank"><img alt={"VCV Event"} height={50}
                                                                                                             src={cvc}/></a> : null

        return <Card className={classes.races} key={r.id}>
            <CardHeader title={r.data.Title} subheader={r.data?.Date} action={vcv} />
            <CardContent>
                {r.data?.CourseData?.data?.Title}
            </CardContent>
        </Card>
    })

    const NewsList = news.map(n => {
        const news = n.data;
        const displayDate = ISODateToPretty(news.Date)
        const url = "/news/"+toURL(n.id)
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

    return <div>
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
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Eureka Cycling Club</h1>
                            <h4>
                                The Eureka Veterans Cycling Club was formed at the beginning of 2009 by a small group of
                                cyclists who believed there was a need for the type of racing that only a veterans club
                                can offer.
                            </h4>
                            <br/>
                            {/*<Button*/}
                            {/*    color="danger"*/}
                            {/*    size="lg"*/}
                            {/*    // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"*/}
                            {/*    target="_blank"*/}
                            {/*    rel="noopener noreferrer"*/}
                            {/*>*/}
                            {/*    Join Eureka*/}
                            {/*</Button>*/}
                        </Grid>
                    </Grid>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Grid container justify="center" spacing={2}>
                            <Grid item xs={12} sm={12} md={8}>
                                <h2 className={classes.title}>Let{"'"}s talk product</h2>
                                <h5 className={classes.description}>

                                </h5>
                            </Grid>
                        </Grid>
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
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

}

export async function getStaticProps() {


    const courses = await DocListCourses(process.env.FAUNADB_SECRET)
    const users = await DocListUsers(process.env.FAUNADB_SECRET)
    const races = (await DocListRaces(process.env.FAUNADB_SECRET)).filter(r => {
        const raceDate = r.data?.Date ? parse(r.data.Date, "yyyy-MM-dd", new Date()) : null;
        return r.data !== undefined &&
            raceDate && isFuture(raceDate)
    }).map<Race>(r => {
        const courseData = courses.filter(c => c.id == r.data.Course).pop()
        if (courseData) {
            r.data.CourseData = courseData
        }
        r.data.MarshallNames = r.data?.Marshalls ? users.filter(c => r.data.Marshalls.indexOf(c.id) != -1).map(u => u.data.name) : [];
        return r
    }).sort(dateSortCompareOldestFirst).filter((_, i)=> {return i < 3})

    const news = (await DocListNews(process.env.FAUNADB_SECRET)).filter(n => {
        console.log(n.data.Date)
        return (n.data.Date || false) !== false
    }).sort(dateSortCompareNewestFirst).filter((_, i)=> {return i < 3})


    return {props:{races,news}}

}



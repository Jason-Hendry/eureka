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
import {DocListRaces, DocListCourses, DocListUsers, DocListNews} from "../../services/DirectService";
import {Race, RaceList} from "../../models/Race";
import {NewsList} from "../../models/News";
import Link from "next/link";
import {ButtonLink} from "../../components/CustomButtons/Button";
import {ISODateToPretty} from "../../services/dates";
import {dateSortCompareOldestFirst, dateSortCompareNewestFirst} from "../../services/sort";
import {toURL} from "../../services/url";

const cvc = require("../../assets/img/vcv.svg")

const useStyles = makeStyles((theme) => createStyles({
    container: {
        ...container,
        zIndex: 12,
        color: "#FFFFFF"
    },
    title: {
        ...title,
        display: "inline-block",
        // position: "relative",
        marginTop: 30,
        minHeight: 32,
        color: "#FFFFFF",
        textDecoration: "none",
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
export default function RacePage({news}: { news: NewsList }) {
    const classes = useStyles();

    const NewsList = news.map(n => {
        const news = n.data;
        const displayDate = ISODateToPretty(news.Date)
        const url = "/news/"+n.id
        return <Grid item xs={12} md={6} lg={4}><Card className={classes.raceCard} key={n.id}>
            <CardHeader title={news.Title} subheader={displayDate}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {news.Teaser}
                </Typography>
                <Link href={url}><a>Read More</a></Link>
            </CardContent>
        </Card></Grid>
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
            />
            <Parallax filter small responsive image={require("assets/img/bg3.jpg")}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Eureka Club News</h1>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Grid container spacing={2}>
                        {NewsList}
                        </Grid>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export async function getStaticProps() {
    const news = (await DocListNews(process.env.FAUNADB_SECRET)).filter(n => {
        console.log(n.data.Date)
        return (n.data.Date || false) !== false
    }).sort(dateSortCompareNewestFirst)

    return {props:{news}}
}

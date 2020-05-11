import fetch from 'node-fetch'
import {parse,format} from 'date-fns'
import {DocGetNews, DocListNews} from "../../services/DirectService";
import {toURL} from "../../services/url";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import {Grid} from "@material-ui/core";
import InfoArea from "../../components/InfoArea/InfoArea";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import EventIcon from "@material-ui/icons/Event";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import Footer from "../../components/Footer/Footer";
import React from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles} from "@material-ui/styles";
import {container, title} from "../../assets/jss/nextjs-material-kit";
import {ISODateToPretty} from "../../services/dates";


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


export default function News({news: {Title, Teaser, Date, Body}}) {
    const classes = useStyles();

    const niceDate = ISODateToPretty(Date)

    return <div>
        <Header
            color="transparent"
            brand=""
            rightLinks={<HeaderLinks/>}
            fixed
            changeColorOnScroll={{
                height: 400,
                color: "white"
            }}
        />
        <Parallax filter responsive image={require("assets/img/bg3.jpg")}>
            <div className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6}>
                        <h1 className={classes.title}>{Title}</h1>
                        <h2 className={classes.title}>{niceDate}</h2>
                        <h4>{Teaser}</h4>
                        <br/>
                    </Grid>
                </Grid>
            </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
                <div className={classes.section}>
                    {Body}
                </div>
            </div>
        </div>
        <Footer/>
    </div>

}

// @ts-ignore
export async function getStaticProps({params: {news}}) {
    const newsArticle = await DocGetNews(news, process.env.FAUNADB_SECRET)
    console.log({props:{news:newsArticle.data}})
    return {props:{news:newsArticle.data}}
}

export async function getStaticPaths() {
    const paths = (await DocListNews(process.env.FAUNADB_SECRET)).filter(n => {
        // console.log(n.data.Date)
        return (n.data.Date || false) !== false
    }).map(n => {
        return {params:{news:n.id}}
    })
    return {
        paths,
        fallback: false
    }
}

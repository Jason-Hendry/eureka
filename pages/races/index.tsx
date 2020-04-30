import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

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
import {Button, Grid} from "@material-ui/core";
import {DocListRaces} from "../../services/DirectService";
import {RaceList} from "../../models/Race";

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
        textAlign: "center"
    },
    description: {
        color: "#999"
    }
}));

interface Props {
    races: RaceList
}

// Sections for this page
export default function Race(props: Props) {
    const classes = useStyles();
    const {races, ...rest} = props;

    const RaceList = races.map(r => <div key={r.id}>{r.data.Title}</div>)

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
                    <GridContainer>
                        <Grid xs={12} sm={12} md={6}>
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
                        </Grid>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <GridContainer>
                            <Grid xs={12} sm={12} md={8}>
                                {RaceList}
                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export async function getStaticProps() {
    const props = {
        races: await DocListRaces(process.env.FAUNADB_SECRET)
    }
    props.races = props.races.filter(r => r.data !== undefined)
    return {props}
}

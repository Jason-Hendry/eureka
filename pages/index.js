import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
import {listMajors} from "./api/races";
import authorize from "../google/auth";
import {format} from "date-fns";
import InfoArea from "../components/InfoArea/InfoArea";
import MapIcon from '@material-ui/icons/Map';
import EventIcon from '@material-ui/icons/Event';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AnnouncementIcon from '@material-ui/icons/Announcement';

// Sections for this page

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
    const classes = useStyles();
    const {races, ...rest} = props;

    const raceList = races.sort((a,b) => a.sort-b.sort).map(r => <li>{r.Title} - {r.Course}</li>)

    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
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
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Eureka Cycling Club</h1>
                            <h4>
                                The Eureka Veterans Cycling Club was formed at the beginning of 2009 by a small group of
                                cyclists who believed there was a need for the type of racing that only a veterans club
                                can offer.
                            </h4>
                            <br/>
                            <Button
                                color="danger"
                                size="lg"
                                // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join Eureka
                            </Button>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8}>
                                <h2 className={classes.title}>Let{"'"}s talk product</h2>
                                <h5 className={classes.description}>
                                    This is the paragraph where you can write more details about your
                                    product. Keep you user engaged by providing meaningful information.
                                    Remember that by this time, the user is curious, otherwise he wouldn
                                    {"'"}t scroll to get here. Add a button if you want the user to see
                                    more.
                                </h5>
                            </GridItem>
                        </GridContainer>
                        <div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <InfoArea
                                        title="Latest News"
                                        description="..."
                                        icon={AnnouncementIcon}
                                        iconColor="info"
                                        vertical
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <InfoArea
                                        title="Upcoming Races"
                                        description="..."
                                        icon={EventIcon}
                                        iconColor="success"
                                        vertical
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <InfoArea
                                        title="Race Results"
                                        description="..."
                                        icon={DirectionsBikeIcon}
                                        iconColor="danger"
                                        vertical
                                    />
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export async function getStaticProps(props) {
    const data = await listMajors(authorize())

    props['races'] = data.map(r => {
        console.log(r.Date)
        // r['sort'] = parseInt(format(r.Date, 'yyyy'))
        // r['month'] = format(r.Date, 'MMMM')
        delete r['Timestamp']
        delete r['Date']
        return r
    })

    return {props}
}



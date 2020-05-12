import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";
import {Grid} from "@material-ui/core";
import Footer from "../components/Footer/Footer";
import React, {ReactChildren} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../assets/jss/PublicLayout";
import classNames from "classnames";

interface LayoutProps {
    children: React.ReactNode
    heroImage: string
    title: string
    leadParagraph?: string
    small?: boolean
}
const useStyles = makeStyles(styles);

export default function PublicLayout({children, heroImage, title, leadParagraph, small}: LayoutProps) {
    const classes = useStyles();

    return <div>
        <Header
            color="transparent"
            // routes={dashboardRoutes}
            brand=""
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
                height: 400,
                color: "white"
            }}
        />
        <Parallax filter small={small} responsive image={heroImage}>
            <div className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6}>
                        <h1 className={classes.title}>{title}</h1>
                        {leadParagraph ? <h4>
                            {leadParagraph}
                        </h4> : null}
                        <br/>
                    </Grid>
                </Grid>
            </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
                <div className={classes.section}>
                    {children}
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}

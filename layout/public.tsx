import React, {FC, ReactChildren} from "react";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import Link from "next/link";
import {HeroHeading} from "./hero/HeroHeading";
import Parallax from "./parallax/Parallax";
import {container} from "./container/container";
import HeaderLinks from "./header/HeaderLinks";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {Theme, withTheme} from "@material-ui/core";

const useStyles = ({palette}: Theme) => makeStyles({
    brandImage: {
        cursor: "pointer"
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
    container: {
        ...container
    },
    section: {
        padding: "70px 0",
        color:palette.text.primary
    },
    heroBg: {
        backgroundPositionY: "center"
    }
});

const eurekaLogo = require("../assets/img/eureka-logo.svg")
const eurekaLogoWhite = require("../assets/img/eureka-logo-white.svg")

interface PublicLayoutProps {
    children: React.ReactNode
    heroImage: string
    title: string
    leadParagraph?: string
    small?: boolean
    theme: Theme
}

export const PublicLayout: FC<PublicLayoutProps> = ({children, heroImage, title, leadParagraph, small, theme}) => {
    const classes = useStyles(theme)();

    return <div>
        <Header
            color="transparent"
            // routes={dashboardRoutes}
            brand={<img className={classes.brandImage} height={80} src={eurekaLogoWhite} alt={"Eureka Cycling"} />}
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
                height: small ? 200 : 400,
                color: "white",
                scrollBrand: <img className={classes.brandImage} height={80} src={eurekaLogo} alt={"Eureka Cycling"} />
            }}
        />
        <Parallax filter small={small} responsive image={heroImage} className={classes.heroBg}>
            <HeroHeading title={title} leadParagraph={leadParagraph}/>
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
export default withTheme(PublicLayout);

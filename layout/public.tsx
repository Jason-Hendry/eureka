import React, {FC} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {HeroHeading} from "./hero/HeroHeading";
import Parallax from "./parallax/Parallax";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {Container, createStyles, Paper, PaperClassKey, Theme} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/styles/withStyles/withStyles";
import {EmbeddedImage} from "../models/base";

const usePaperStyles: () => Partial<ClassNameMap<PaperClassKey>> = makeStyles(({
                                                                                   palette,
                                                                                   spacing
                                                                               }: Theme) => createStyles({
    root: {
        backgroundColor: palette.grey["100"],
        padding: spacing(2)
    }
}));
const useStyles = makeStyles(() => createStyles({
    brandImage: {
        cursor: "pointer"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: 3
    },
    heroBg: {
        backgroundPositionY: "center"
    },
}));

const eurekaLogo = require("../assets/img/eureka-logo.svg")
const eurekaLogoWhite = require("../assets/img/eureka-logo-white.svg")

interface PublicLayoutProps {
    children: React.ReactNode
    heroImage: string
    heroImages?: EmbeddedImage[]
    title: string
    leadParagraph?: string | JSX.Element
    small?: boolean
    blur?: boolean
}

export const PublicLayout: FC<PublicLayoutProps> = ({children, heroImage, heroImages, title, leadParagraph, small, blur}) => {
    const classes = useStyles();
    const paperClass = usePaperStyles();

    return <div>
        <Header
            color="transparent"
            // routes={dashboardRoutes}
            brand={<img className={classes.brandImage} height={80} src={eurekaLogoWhite} alt={"Eureka Cycling"}/>}
            changeColorOnScroll={{
                height: small ? 200 : 400,
                color: "white",
                scrollBrand: <img className={classes.brandImage} height={80} src={eurekaLogo} alt={"Eureka Cycling"}/>
            }}
        />
        <Parallax filter small={small} responsive image={heroImages ? heroImages : heroImage}
                  className={classes.heroBg} blur={blur}>
            <HeroHeading title={title} leadParagraph={leadParagraph}/>
        </Parallax>
        <Container>
            <Paper classes={paperClass} elevation={10} style={{position: "relative", zIndex: 5}}>
                {children}
            </Paper>
        </Container>
        <Footer/>
    </div>
}
export default PublicLayout;

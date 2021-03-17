import React, {FC} from "react";
import {Grid, Theme} from "@material-ui/core"
import {makeStyles, Styles} from "@material-ui/styles";
import {container} from "../container/container";

interface HeroHeadingProps {
    title: string
    leadParagraph?: string
}

const useHeroHeadingStyle = makeStyles({
    container,
    title: {
        margin: "1.75rem 0 0.875rem",
        textDecoration: "none",
        fontWeight: 700,
        fontFamily: `"Roboto Slab", "Times New Roman", serif`,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
    }
})

export const HeroHeading: FC<HeroHeadingProps> = ({title, leadParagraph}) => {
    const classes = useHeroHeadingStyle()
    return <div className={classes.container}>
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
}

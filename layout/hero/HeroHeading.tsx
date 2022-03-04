import React, {FC, ReactChild, ReactChildren} from "react";
import {Container, createStyles, Grid, Typography, TypographyClassKey} from "@mui/material"
import {makeStyles} from "@mui/styles";
import {container} from "../container/container";
import {ClassNameMap} from "@mui/styles/withStyles/withStyles";

interface HeroHeadingProps {
    title: string
    leadParagraph?: string|JSX.Element
}

const useTypographyStyle: () => Partial<ClassNameMap<TypographyClassKey>> = makeStyles({
    colorTextPrimary: {
        color: "#ffffff",
        zIndex: 2,
        position: "relative"
    }
})

export const HeroHeading: FC<HeroHeadingProps> = ({title, leadParagraph}) => {
    const classes = useTypographyStyle()
    return <Container>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
                <Typography classes={classes} variant={"h3"} component={'h1'} color={"textPrimary"}>{title}</Typography>
                {leadParagraph && <Typography classes={classes} variant={"h6"} component={'span'} color={"textPrimary"}>{leadParagraph}</Typography>}
                <br/>
            </Grid>
        </Grid>
    </Container>
}

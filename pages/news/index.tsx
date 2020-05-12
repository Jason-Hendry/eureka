import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {createStyles} from "@material-ui/styles";
import {Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {DocListNews} from "../../services/DirectService";
import {NewsList} from "../../models/News";
import Link from "next/link";
import {ISODateToPretty} from "../../services/dates";
import {dateSortCompareNewestFirst} from "../../services/sort";
import PublicLayout from "../../layouts/public";

const useStyles = makeStyles((theme) => createStyles({
    raceCard: {
        marginBottom: theme.spacing(2)
    },
}));

interface Props {
    news: NewsList
}

// Sections for this page
export default function RacePage({news}: Props) {
    const classes = useStyles();

    const NewsList = news.map(n => {
        const news = n.data;
        const displayDate = ISODateToPretty(news.Date)
        const url = "/news/" + n.id
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

    return <PublicLayout small={true} heroImage={require("../../assets/img/bg3.jpg")} title={"Eureka News"}>
        <Grid container spacing={2}>
            {NewsList}
        </Grid>
    </PublicLayout>
}

export async function getStaticProps() {
    const news = (await DocListNews(process.env.FAUNADB_SECRET)).filter(n => {
        console.log(n.data.Date)
        return (n.data.Date || false) !== false
    }).sort(dateSortCompareNewestFirst)

    return {props: {news}}
}

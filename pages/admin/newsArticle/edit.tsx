import React, {useContext, useEffect, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {DocGetNews, DocPutNews, DocPutRaces, RaceFetcher} from "../../../services/APIService";
import {News, NewsData} from "../../../models/News";
import useSWR, {mutate} from "swr";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    field: {
       marginBottom: theme.spacing(2)
    }
}))
const inputProps = {
    step: 300,
};

function NewsArticle() {
    const classes = useStyles();
    const router = useRouter();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#','') : "";
    const key = `/api/News/${id}?secret=${secret}`
    const {data, error} = useSWR<News>(key, RaceFetcher)
    const news = data?.data

    const setNews = (newsData: NewsData) => {
        mutate(key, {...data, data:newsData}, false)
    }

    const [btnLabel, setBtnLabel] = useState("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutNews(news, id, secret).then(e => {
            setBtnLabel("Save")
            router.push("/admin/news")
        }).catch(e => setBtnLabel("Failed"));
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit News</Typography></Toolbar>

        <TextField className={classes.field} variant={"standard"}
                   label={'News.ts Date'}
                   value={news?.['Date'] || ""}
                   onChange={(e) => setNews({...news, Date: e.target.value})}
                   type={"date"} InputLabelProps={{shrink: true}} fullWidth={true} />
        <TextField className={classes.field} variant={"standard"}
                   label={'Title'}
                   onChange={(e) => setNews({...news, Title: e.target.value})}
                   value={news?.['Title'] || ""} InputLabelProps={{shrink: true}} fullWidth={true} />


        <Button variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper>

}
export async function getStaticProps(props) {
    return {props}
}
export default NewsArticle

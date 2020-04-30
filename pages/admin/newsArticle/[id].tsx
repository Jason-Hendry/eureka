import React, {useContext, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {Button, Paper, TextField, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {DocGetNews, DocPutNews} from "../../../services/DocumentService";
import {NewsData} from "../../../models/News";

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

function NewsArticle({id}) {
    const secret = useContext(Secret);
    const classes = useStyles();
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)

    const [news, setNews] = useState<NewsData>({Title:""})
    const [btnLabel, setBtnLabel] = useState("Save")

    if(process.browser && !loaded) {
        setLoaded(true)

        DocGetNews(id, secret).then(r => {
            setNews(r.data)
        }).catch((err) => {
            // console.log('News.ts: ', err)
            setNews({"Title":"Error"})
        })
    }

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
NewsArticle.getInitialProps = async ctx => {
    return { id: ctx.query.id }
}
export default NewsArticle

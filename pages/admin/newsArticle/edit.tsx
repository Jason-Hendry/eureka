import React, {useContext, useEffect, useState} from "react"
import {Secret} from "../../../components/AdminTheme/Secret";
import {
    Button,
    FormControl,
    FormHelperText, FormLabel, Input,
    InputLabel,
    Paper, TextareaAutosize,
    TextField,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {DocGetNews, DocPutNews, DocPutRaces, RaceFetcher} from "../../../services/APIService";
import {News, NewsData} from "../../../models/News";
import useSWR, {mutate} from "swr";
import {format} from "date-fns";
import {ImageSelector} from "../../../components/ImageSelector";
import {Image} from "../../../models/Image";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    field: {
        marginBottom: theme.spacing(2)
    },
    image: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}))
const inputProps = {
    step: 300,
};

function NewsArticle() {
    const classes = useStyles();
    const router = useRouter();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#', '') : "";
    const key = `/api/News/${id}?secret=${secret}`
    const {data, error} = useSWR<News>(key, RaceFetcher)
    const [newState, setNewsState] = useState({})

    const news = {Date: format(new Date(), "yyyy-MM-dd"), ...data?.data, ...newState}

    const setNews = (newsData: NewsData) => {
        setNewsState(newsData)
        mutate(key, {...data, data: newsData}, false)
    }

    const addImage = (image: Image) => {
        const Images = news?.Images || [];
        Images.push(image)
        setNews({...news, Images})
    }
    const [btnLabel, setBtnLabel] = useState("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutNews(news, id, secret).then(e => {
            setBtnLabel("Save")
            router.push("/admin/news")
        }).catch(e => setBtnLabel("Failed"));
    }

    const defaultFieldProps = {
        className: classes.field,
        fullWidth: true,
        InputLabelProps: {shrink: true},
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Edit
            News</Typography></Toolbar>

        <TextField {...defaultFieldProps}
                   label={'News Date'}
                   value={news?.['Date'] || ""}
                   onChange={(e) => setNews({...news, Date: e.target.value})}
                   type={"date"}/>
        <TextField {...defaultFieldProps}
                   label={'Title'}
                   onChange={(e) => setNews({...news, Title: e.target.value})}
                   value={news?.['Title'] || ""} InputLabelProps={{shrink: true}} fullWidth={true}/>
        <TextField {...defaultFieldProps}
                   multiline={true}
                   inputProps={{inputComponent: TextareaAutosize}}
                   label={'Teaser'}
                   helperText={'Short blurb for home page. approx 15 words'}
                   onChange={(e) => setNews({...news, Teaser: e.target.value})}
                   value={news?.['Teaser'] || ""} InputLabelProps={{shrink: true}} fullWidth={true}/>

        <TextField {...defaultFieldProps}
                   multiline={true}
                   inputProps={{inputComponent: TextareaAutosize}}
                   label={'Body'}
                   helperText={"Use 2 new lines to create a new paragraph."}
                   onChange={(e) => setNews({...news, Body: e.target.value})}
                   value={news?.['Body'] || ""} InputLabelProps={{shrink: true}} fullWidth={true}/>

        <FormControl margin={"normal"} className={classes.field}>
            <FormLabel>Images</FormLabel>

            {news?.Images ? news.Images.map((i, k) => <img className={classes.image} key={k}
                                                           src={i.data.admin}/>) : null}

            <ImageSelector addImage={addImage}/>
        </FormControl>


        <Button fullWidth={true} variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper>

}

export async function getStaticProps(props) {
    return {props:{}}
}

export default NewsArticle

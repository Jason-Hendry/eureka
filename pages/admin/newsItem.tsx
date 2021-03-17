import React, {FC, useContext, useState} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    TextField, Theme,
    Typography, withTheme
} from "@material-ui/core";
import {CoursesCollectionApi, NewsCollectionApi, RaceCollectionApi} from "../../services/APIService";
import {Secret} from "../../layout/Admin/Secret";
import {makeStyles} from "@material-ui/styles";
import {loadApiEffectAndSave} from "../../effects/loadApiEffect";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {CourseData} from "../../models/Course";
import {NewsData} from "../../models/News";

const useStyles = (theme: Theme) => makeStyles({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    raceImage: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
})
const inputProps = {
    step: 300,
};

type RaceProps = {
    theme: Theme;
}

const AdminIndex:FC<RaceProps> = ({theme}) => {
    const secret = useContext(Secret)
    const [news, setNews] = useState<NewsData|null>(null)
    const save = loadApiEffectAndSave(NewsCollectionApi, secret, news, setNews, () => ({Title: ""}))

    if(!news) {
        return <Paper>
            <Container>Loading...</Container>
        </Paper>
    }

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{document.location.hash.length ? 'Edit' : 'Create New '} News Item</Typography>

            <form onSubmit={e => e.preventDefault()}>
                <TextField {...defaultFieldProps}
                           label={'Title'}
                           onChange={(e) => setNews({...news, Title: e.target.value})}
                           value={news?.Title || ""}
                />

                <TextField {...defaultFieldProps}
                    multiline={true}
                           label={'Teaser'}
                           onChange={(e) => setNews({...news, Teaser: e.target.value})}
                           value={news?.Teaser || ""}
                />

                <TextField {...defaultFieldProps}
                    multiline={true}
                           label={'Content'}
                           onChange={(e) => setNews({...news, Body: e.target.value})}
                           value={news?.Body || ""}
                />

                <TextField {...defaultFieldProps}
                           label={'News Date'}
                           value={news.Date || ""}
                           onChange={(e) => setNews({...news, Date: e.target.value})}
                           type={"date"}
                />

                <FormControl fullWidth={true} margin={"normal"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"} onClick={save}>{document.location.hash.length ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>

}

export default withTheme(AdminIndex)

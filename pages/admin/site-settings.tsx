import React, {useContext, useState} from "react"
import {Secret} from "../../components/AdminTheme/Secret";
import {Button, FormControl, FormLabel, Paper, Theme, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import useSWR, {mutate} from "swr";
import {Image} from "../../models/Image";
import {ImageSelector} from "../../components/ImageSelector";
import {SiteSetting, SiteSettingData} from "../../models/SiteSetting";
import {DocPutSiteSetting, SiteSettingFetcher} from "../../services/APIService";

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

export default function EditCourse() {
    const classes = useStyles();

    const secret = useContext(Secret);
    const id = process.browser ? document.location.hash.replace('#', '') : "";
    const key = `/api/SiteSettings/${id}?secret=${secret}`
    const {data, error} = useSWR<SiteSetting>(key, SiteSettingFetcher)
    const siteSetting = data?.data

    const setSiteSetting = (siteSettingData: SiteSettingData) => {
        mutate(key, {...data, data: siteSettingData}, false)
    }

    const addImage = (image: Image) => {
        const HomePageImages = siteSetting?.HomePageImages || [];
        HomePageImages.push(image)
        setSiteSetting({...siteSetting, HomePageImages})
    }

    const [btnLabel, setBtnLabel] = useState("Save")

    const save = () => {
        setBtnLabel("Saving...")
        DocPutSiteSetting(siteSetting, id, secret as string).then(e => {
            setBtnLabel("Save")
        }).catch(e => setBtnLabel("Failed"));
    }

    return <Paper className={classes.root}>
        <Toolbar className={classes.tableHeading}><Typography variant={"h6"} component={"div"}>Site Settings</Typography></Toolbar>


        <FormControl margin={"normal"} className={classes.field}>
            <FormLabel>Home Page Image</FormLabel>

            {siteSetting?.HomePageImages ? siteSetting.HomePageImages.map((i, k) => <img alt={i.data.alt} className={classes.image} key={k}
                                                          src={i.data.admin}/>) : null}

            <ImageSelector addImage={addImage}/>
        </FormControl>

        <Button fullWidth={true} variant={"contained"} color={"primary"} onClick={save}>{btnLabel}</Button>
    </Paper>

}

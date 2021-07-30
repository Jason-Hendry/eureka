import React, {FC} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    Theme,
    Typography, withTheme
} from "@material-ui/core";
import {SiteSettingsCollectionApi} from "../../services/APIService";
import { useAdminEffects} from "../../effects/loadApiEffect";
import {SiteSettingData} from "../../models/SiteSetting";
import ImageField, {HeroSize} from "../../components/form/ImageField";

type RaceProps = {
    theme: Theme;
}

const BlankSiteSetting = ():SiteSettingData => ({
    HomePageImages: [],
    HomePageImage: ""
})

const AdminIndex:FC<RaceProps> = ({}) => {
    const {save, merge, data: siteSettings} = useAdminEffects(SiteSettingsCollectionApi, BlankSiteSetting)

    if(!siteSettings) {
        return <Paper>
            <Container>Loading...</Container>
        </Paper>
    }

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{document.location.hash.length ? 'Edit' : 'Create New '} Site Settings</Typography>

            <ImageField value={siteSettings.HomePageImage} label={'Home Page Image'} onChange={v => merge({HomePageImage: v || undefined})} {...HeroSize} />

            <form onSubmit={e => e.preventDefault()}>
                <FormControl fullWidth={true} margin={"normal"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"} onClick={save}>{document.location.hash.length ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>

}

export default withTheme(AdminIndex)

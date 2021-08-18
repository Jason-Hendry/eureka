import React, {VFC} from "react"
import {
    Container,
    Paper,
} from "@material-ui/core";
import {SiteSettingsCollectionApi} from "../../services/APIService";
import {SiteSettingData} from "../../models/SiteSetting";
import ImageField, {HeroSize} from "../../components/form/ImageField";
import {useAdminEffects} from "../../effects/useAdminEffects";
import { AdminForm } from "../../components/form/AdminForm";
import LatLngField from "../../components/form/LatLngField";
import SingleLineTextField from "../../components/form/SingleLineTextField";

const BlankSiteSetting = ():SiteSettingData => ({
    HomePageImages: [],
    HomePageImage: "",
    EurekaClubHouseLocation: null,
    EurekaClubHouseRegistration: null
})

const AdminIndex:VFC = () => {
    const {save, merge, data: siteSettings, isEdit, errors} = useAdminEffects(SiteSettingsCollectionApi, BlankSiteSetting)

    if(!siteSettings) {
        return <Paper>
            <Container>Loading...</Container>
        </Paper>
    }

    return <AdminForm label={'Site Settings'} deleteRecord={null} isEdit={isEdit} save={save} errors={errors}>

        <ImageField value={siteSettings.HomePageImage} label={'Home Page Image'} onChange={v => merge({HomePageImage: v || undefined})} {...HeroSize} id={"HomePage"} />
        <LatLngField id={"reg_location"} value={siteSettings.EurekaClubHouseLocation} label={"Map location for registration"} onChange={EurekaClubHouseLocation => merge({EurekaClubHouseLocation})} />
        <SingleLineTextField id={"reg_info"} value={siteSettings.EurekaClubHouseRegistration} label={"Information about registration location"} onChange={EurekaClubHouseRegistration => merge({EurekaClubHouseRegistration})} />

    </AdminForm>
}

export default AdminIndex

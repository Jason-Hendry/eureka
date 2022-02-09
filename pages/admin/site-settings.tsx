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
import MultiLineTextField from "../../components/form/MultiLineTextField";
import {RepeatSection} from "../../components/form/RepeatSection";
import {BlankEmbeddedImage} from "../../models/base";

const BlankSiteSetting = ():SiteSettingData => ({
    HomePageImages: [],
    HomePageImage: "",
    HomePageText: "",
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

        <MultiLineTextField id={"HomePageText"} value={siteSettings.HomePageText} label={"Home Page Text"} onChange={v => merge({HomePageText: v || ""})} />

        {/*<ImageField value={siteSettings.HomePageImage} label={'Home Page Image'} onChange={v => merge({HomePageImage: v || undefined})} {...HeroSize} id={"HomePage"} />*/}

        <RepeatSection id={"HomePageImages"} value={siteSettings.HomePageImages} label={"Home Page Images"} onChange={v => merge({HomePageImages: v || undefined})} section={(value, imageMerge, i) => (
            <>
                <ImageField value={value.image} label={'Image'} onChange={(v) => imageMerge({image: v || undefined})} {...HeroSize} id={"HomePage"+i} />
                <SingleLineTextField id={`altText${i}`} value={value.altText} label={`Alt Text ${i+1}`} onChange={v => imageMerge({altText: v||undefined})} />
                <SingleLineTextField id={`caption${i}`} value={value.caption || ""} label={`Caption ${i+1}`} onChange={v => imageMerge({caption: v||undefined})} />
            </>
        )} blank={BlankEmbeddedImage} />

        <LatLngField id={"reg_location"} value={siteSettings.EurekaClubHouseLocation} label={"Map location for registration"} onChange={EurekaClubHouseLocation => merge({EurekaClubHouseLocation})} />
        <SingleLineTextField id={"reg_info"} value={siteSettings.EurekaClubHouseRegistration} label={"Information about registration location"} onChange={EurekaClubHouseRegistration => merge({EurekaClubHouseRegistration})} />

    </AdminForm>
}

export default AdminIndex

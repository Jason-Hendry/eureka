import React, {FC} from "react"
import {SiteSetting} from "../models/SiteSetting";
import PublicLayout from "../layout/public";
import {GetStaticProps} from "next";
import {SiteSettingsCollection} from "../services/DirectService";
import {Join as JoinInfo} from "../components/commonInfo/Join";

type JoinProps = {
    siteSetting: SiteSetting
}

export const Join: FC<JoinProps> = ({siteSetting}) => {
    const image = siteSetting.data?.HomePageImage ? siteSetting.data.HomePageImage : '';



    return <PublicLayout small={true} heroImage={image} title={"JoinPage Eureka Cycling"}>
            <JoinInfo />
    </PublicLayout>
}
export default Join

export const getStaticProps: GetStaticProps<JoinProps> = async () => {

    const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

    return {props: {siteSetting}}
}



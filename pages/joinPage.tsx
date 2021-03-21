import React, {FC, useContext, useState} from "react"
import {Paper} from "@material-ui/core";
import {SiteSetting} from "../models/SiteSetting";
import {BaseList} from "../models/base";
import {FilterHasDate, NewsData} from "../models/News";
import PublicLayout from "../layout/public";
import {GetStaticProps} from "next";
import {NewsCollection, SiteSettingsCollection} from "../services/DirectService";
import {dateSortCompareNewestFirst, LimitFilter} from "../services/sort";
import Join from "../components/commonInfo/Join";

type JoinProps = {
    siteSetting: SiteSetting
}


export const JoinPage: FC<JoinProps> = ({siteSetting}) => {
    const image = siteSetting.data?.HomePageImages?.length ?
        siteSetting.data.HomePageImages[0].data.hero :
        '';


    return <PublicLayout small={true} heroImage={image} title={"JoinPage Eureka Cycling"}>
            <Join />
    </PublicLayout>
}
export default JoinPage

export const getStaticProps: GetStaticProps<JoinProps> = async () => {

    const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

    return {props: {siteSetting}}
}



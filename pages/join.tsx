import React, {FC, useContext, useState} from "react"
import {Paper} from "@material-ui/core";
import {SiteSetting} from "../models/SiteSetting";
import {BaseList} from "../models/base";
import {FilterHasDate, NewsData} from "../models/News";
import PublicLayout from "../layout/public";
import {GetStaticProps} from "next";
import {NewsCollection, SiteSettingsCollection} from "../services/DirectService";
import {dateSortCompareNewestFirst, LimitFilter} from "../services/sort";

type JoinProps = {
    siteSetting: SiteSetting
}


export const Join: FC<JoinProps> = ({siteSetting}) => {
    const image = siteSetting.data?.HomePageImages?.length ?
        siteSetting.data.HomePageImages[0].data.hero :
        '';


    return <PublicLayout small={true} heroImage={image} title={"Join Eureka Cycling"}>
            <p>To join and race with Eureka Cycling you will need an <a
                href={"https://www.auscycling.org.au/membership/race-all-discipline"}>AusCycling Race All Discipline
                Membership</a> and select "Eureka Cycling Club".</p>

                <p>If you are a member of another AusCycling club you can
                join Eureka Cycling Club with a <a
                    href={"https://www.auscycling.org.au/membership/other/club-add"}>Race
                    Member Club Add-On.</a>
                </p>
    </PublicLayout>
}
export default Join

export const getStaticProps: GetStaticProps<JoinProps> = async () => {

    const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

    return {props: {siteSetting}}
}



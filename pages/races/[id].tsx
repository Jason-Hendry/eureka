import {FC} from "react";
import Head from "next/head";
import {BaseModel} from "../../models/base";
import {GetStaticPaths, GetStaticProps} from "next";
import {CoursesCollection, RaceCollection, SiteSettingsCollection} from "../../services/DirectService";
import {ParsedUrlQuery} from "querystring";
import PublicLayout from "../../layout/public";
import {SiteSettingData} from "../../models/SiteSetting";
import nl2br from "react-nl2br";
import {Button, Typography} from "@mui/material";
import {FilterFutureRace, RaceMergeData, RaceTitle} from "../../models/Race";
import {ISODateToPretty} from "../../services/dates";
import Columns, {Half} from "../../layout/columns/Columns";
import {getFile} from "../../services/getFile";
import {getGPXData} from "../../services/maps/getGPXData";
import {getGPXSimpleArrays} from "../../services/maps/getGPXSimpleArrays";
import {RaceCourse} from "../../components/sections/RaceCourse";

interface RacePageProps {
    race: BaseModel<RaceMergeData>
    siteSetting: BaseModel<SiteSettingData>
}
interface NewsPageParams extends ParsedUrlQuery {
    id: string
}

export const RacePage: FC<RacePageProps> = ({ race, siteSetting}) => {
    if(!race) {
        return null
    }

    const image = siteSetting?.data?.HomePageImages?.length ?
        siteSetting.data.HomePageImages[0].image :
        '';

    const leadP: JSX.Element | undefined  = race.data?.RegistrationURL ? <Button variant={"contained"} color={"primary"} href={race.data?.RegistrationURL}>Register Online Now</Button> : undefined

    return (
        <PublicLayout title={RaceTitle(race.data)} leadParagraph={leadP} heroImage={race?.data?.Poster || image} small blur={!!race?.data?.Poster}>
            <Head>
                <title>{RaceTitle(race.data)}</title>
            </Head>
            <Columns>
                <Half>
                    <Typography variant={'h4'} component={"h2"}>Race Information</Typography>
                    {nl2br(race.data?.Notes)}
                    <br/>

                    <Typography variant={'h4'} component={"h2"}>Times</Typography>
                    {race.data?.Date && <p>Date: {ISODateToPretty(race.data?.Date)}</p>}
                    {race.data?.RaceStartTime && <p>Date: {race.data?.RaceStartTime}</p>}
                    {race.data?.RegistrationCutoff && <p>Registration closes: {race.data?.RegistrationCutoff || '9am'}</p>}

                    <br/>
                    <Typography variant={'h4'} component={"h2"}>Course</Typography>
                    <p>{race.data.CourseData?.data?.Title}</p>
                    {race.data.CourseLaps && <p>{race.data.CourseLaps} Laps</p>}
                    {race.data.CourseData?.data?.LapDistance && <p>{race.data.CourseData?.data?.LapDistance} per lap</p>}

                    <RaceCourse course={race.data.CourseData} siteSetting={siteSetting} />

                    {race?.data?.MapImage && <img src={race?.data?.MapImage} style={{maxWidth: '100%'}} alt={`${RaceTitle(race.data)} Map`}/>}
                    {race?.data?.MapDownload && <a href={race?.data?.MapDownload} title={`${RaceTitle(race.data)} Map Download`}>Download Map (PDF)</a>}

                    <br/>
                </Half>
                <Half align={'right'}>
                    {race?.data?.Poster && <img src={race?.data?.Poster} style={{maxWidth: '100%'}} alt={`${RaceTitle(race.data)} Poster`}/>}
                </Half>
            </Columns>




        </PublicLayout>
    )
}
export default RacePage;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<RacePageProps, NewsPageParams> = async ({params}) => {
    const {id} = params || {}
    const race = id ? await RaceCollection(process.env.FAUNADB_SECRET || '').get(id) : null
    if(!race) return {notFound: true}

    const CourseData = race?.data?.Course ? await CoursesCollection(process.env.FAUNADB_SECRET || '').get(race?.data?.Course) : null
    if(CourseData?.data.GPXFile) {
        await getFile(new URL(CourseData?.data.GPXFile)).then(getGPXData).then(getGPXSimpleArrays).then(d => CourseData.data.GPXData = d).catch(console.error)
    }
    const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

    return {props: {race:{...race, data: {...race.data, CourseData, MarshallNames:[]}},siteSetting}, revalidate: 60}
}

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths<NewsPageParams> = async () => {
    const paths = await RaceCollection(process.env.FAUNADB_SECRET || '')
        .list()
        .then((l) => l.filter(FilterFutureRace()))
        .then((l) => l.map(({id}) => ({params:{id}})))
    return {
        fallback: true,
        paths
    }
}



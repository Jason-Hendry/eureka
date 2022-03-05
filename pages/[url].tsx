import {FC} from "react";
import Head from "next/head";
import {BaseModel} from "../models/base";
import {GetStaticPaths, GetStaticProps} from "next";
import {PageCollection, SiteSettingsCollection} from "../services/DirectService";
import {ParsedUrlQuery} from "querystring";
import PublicLayout from "../layout/public";
import {SiteSettingData} from "../models/SiteSetting";
import {PageData} from "../models/Page";
import {DisplayMarkdown} from "../components/form/MarkdownEditorField";

interface PageProps {
    newsItem: BaseModel<PageData>
    siteSetting: BaseModel<SiteSettingData>
}
interface PageParams extends ParsedUrlQuery {
    url: string
}

export const Page: FC<PageProps> = ({ newsItem, siteSetting}) => {
    if(!newsItem) {
        return null
    }

    const image = siteSetting?.data?.HomePageImages?.length ?
        siteSetting.data.HomePageImages[0].image :
        '';

    return <PublicLayout title={newsItem.data.title} leadParagraph={""} heroImage={image} small>
        <Head>
            <title>{newsItem.data.title}</title>
        </Head>
        <DisplayMarkdown value={newsItem.data.content} />
    </PublicLayout>
}
export default Page;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({params}) => {
    const {url} = params || {}
    const page = url ? await PageCollection(process.env.FAUNADB_SECRET || '').findBy("page_by_url", `/${url}`) : null
    const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

    if(page) {
        return {props: {newsItem: page,siteSetting}, revalidate: 60}
    } else {
        return {notFound: true}
    }
}

const stripLeadingSlash = (url: string) => url.replace(/^\//, '')

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
    const paths = await PageCollection(process.env.FAUNADB_SECRET || '').list().then((l) => l.map(({data:{url}}) => url).map(stripLeadingSlash).map(url => ({params:{url}})))

    return {
        fallback: true,
        paths
    }
}

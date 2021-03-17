import {FC} from "react";
import {Theme, WithTheme, withTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {BaseModel} from "../../models/base";
import {NewsData} from "../../models/News";
import {GetStaticPaths, GetStaticProps} from "next";
import {NewsCollection, SiteSettingsCollection} from "../../services/DirectService";
import {ParsedUrlQuery} from "querystring";
import PublicLayout from "../../layout/public";
import {SiteSettingData} from "../../models/SiteSetting";
import nl2br from "react-nl2br";

interface NewsPageProps {
    newsItem: BaseModel<NewsData>
    siteSetting: BaseModel<SiteSettingData>
}
interface NewsPageParams extends ParsedUrlQuery {
    id: string
}

const useStyles = ({spacing}: Theme) => makeStyles({

})

export const NewsPage: FC<NewsPageProps & WithTheme> = ({theme, newsItem, siteSetting}) => {
    const image = siteSetting.data?.HomePageImages?.length ?
        siteSetting.data.HomePageImages[0].data.hero :
        '';

    const classes = useStyles(theme)()
    return (
        <PublicLayout title={newsItem.data.Title} leadParagraph={""} heroImage={image} small>
            {nl2br(newsItem.data.Body)}
        </PublicLayout>
    )
}
export default withTheme(NewsPage);

export const getStaticProps: GetStaticProps<NewsPageProps, NewsPageParams> = async ({params}) => {
    const {id} = params || {}
    const newsItem = id ? await NewsCollection(process.env.FAUNADB_SECRET || '').get(id) : null
    const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

    if(newsItem) {
        return {props: {newsItem,siteSetting}}
    } else {
        return {notFound: true}
    }
}

export const getStaticPaths: GetStaticPaths<NewsPageParams> = async () => {
    const paths = await NewsCollection(process.env.FAUNADB_SECRET || '').list().then((l) => l.map(({id}) => ({params:{id}})))

    return {
        fallback: "blocking",
        paths
    }
}

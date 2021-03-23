import '../styles/Home.module.css'
import PublicLayout from "../layout/public";
import {
   NewsCollection,
  SiteSettingsCollection
} from "../services/DirectService";
import {dateSortCompareNewestFirst,  LimitFilter} from "../services/sort";
import {FilterHasDate, NewsData} from "../models/News";
import {FC} from "react";
import {GetStaticProps} from "next";
import {SiteSetting} from "../models/SiteSetting";
import {BaseList} from "../models/base";
import NewsList from "../components/NewsList";
import Head from "next/head";

type NewsProps = {
  siteSetting: SiteSetting
  news: BaseList<NewsData>
}

export const News: FC<NewsProps> = ({siteSetting, news}) =>{
    const image = siteSetting.data?.HomePageImage ? siteSetting.data.HomePageImage : '';


    return (
    <PublicLayout title={"Eureka Cycling News"} leadParagraph={""} heroImage={image} small>
      <Head>
        <title>Eureka Cycling News</title>
      </Head>
       <NewsList news={news} />
    </PublicLayout>
  )
}
export default News

export const getStaticProps: GetStaticProps<NewsProps> = async () => {

  const news = (await NewsCollection(process.env.FAUNADB_SECRET || '').list())
      .filter(FilterHasDate())
      .sort(dateSortCompareNewestFirst)
      .filter(LimitFilter(20))

  const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

  return {props: {news, siteSetting}}
}



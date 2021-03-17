import Head from 'next/head'
import '../styles/Home.module.css'
import PublicLayout from "../layout/public";
import {
  CoursesCollection, NewsCollection,
  RaceCollection, SiteSettingsCollection, UserCollection
} from "../services/DirectService";
import {FilterFutureRace, MergeCourseUserData, RaceMergeData} from "../models/Race";
import {dateSortCompareNewestFirst, dateSortCompareOldestFirst, LimitFilter} from "../services/sort";
import {FilterHasDate, NewsData} from "../models/News";
import {FC} from "react";
import {GetStaticProps} from "next";
import {SiteSetting} from "../models/SiteSetting";
import {BaseList} from "../models/base";
import Three, {ColumnThird} from "../layout/columns/Three";
import InfoArea from "../layout/InfoArea/InfoArea";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import NewsList from "../components/NewsList";
import RaceList from "../components/RaceList";

type NewsProps = {
  siteSetting: SiteSetting
  news: BaseList<NewsData>
}

export const News: FC<NewsProps> = ({siteSetting, news}) =>{
  const image = siteSetting.data?.HomePageImages?.length ?
      siteSetting.data.HomePageImages[0].data.hero :
      '';

  return (
    <PublicLayout title={"Eureka Cycling News"} leadParagraph={""} heroImage={image} small>
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



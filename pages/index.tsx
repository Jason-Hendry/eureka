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

type HomeProps = {
  siteSetting: SiteSetting
  races: BaseList<RaceMergeData>
  news: BaseList<NewsData>
}

export const Home: FC<HomeProps> = ({siteSetting, news, races}) =>{
  const image = siteSetting.data?.HomePageImages?.length ?
      siteSetting.data.HomePageImages[0].data.hero :
      '';

  const leadP = `The Eureka Cycling Club was formed at the beginning of 2009 by a small group of
                                cyclists who believed there was a need for the type of racing that only a veterans club
                                can offer.`

  return (
    <PublicLayout title={"Eureka Cycling"} leadParagraph={leadP} heroImage={image}>
      <Three>
        <ColumnThird>
          <InfoArea
              icon={<AnnouncementIcon />}
              title={"News and Results"}
              description={""} />
              <NewsList news={news} />
        </ColumnThird>
        <ColumnThird>
          <InfoArea
              icon={<AnnouncementIcon />}
              title={"Upcoming Events"}
              description={""} />
              <RaceList races={races} />
        </ColumnThird>
        <ColumnThird>
          <InfoArea
              icon={<AnnouncementIcon />}
              title={"Join Eureka"}
              description={""} />
        </ColumnThird>
      </Three>
    </PublicLayout>
  )
}
export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async () => {

  const courses = await CoursesCollection(process.env.FAUNADB_SECRET || '').list()
  const users = await UserCollection(process.env.FAUNADB_SECRET || '').list()

  const races = (await RaceCollection(process.env.FAUNADB_SECRET || '').list())
      .filter(FilterFutureRace())
      .map(MergeCourseUserData(courses, users))
      .sort(dateSortCompareOldestFirst)
      .filter(LimitFilter(3))

  const news = (await NewsCollection(process.env.FAUNADB_SECRET || '').list())
      .filter(FilterHasDate())
      .sort(dateSortCompareNewestFirst)
      .filter(LimitFilter(3))

  const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

  return {props: {races, news, siteSetting}}
}



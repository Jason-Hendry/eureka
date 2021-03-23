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
import {CourseData} from "../models/Course";

type CoursesProps = {
  siteSetting: SiteSetting
  courses: BaseList<CourseData>
}

export const Courses: FC<CoursesProps> = ({siteSetting, courses}) =>{
  const image = siteSetting.data?.HomePageImages?.length ?
      siteSetting.data.HomePageImages[0].data.hero :
      '';

  return (
    <PublicLayout title={"Courses"} leadParagraph={""} heroImage={image} small>

    </PublicLayout>
  )
}
export default Courses

export const getStaticProps: GetStaticProps<CoursesProps> = async () => {

  const courses = await CoursesCollection(process.env.FAUNADB_SECRET || '').list()

  const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

  return {props: {courses, siteSetting}}
}


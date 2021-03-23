import '../styles/Home.module.css'
import PublicLayout from "../layout/public";
import {
  CoursesCollection,
  RaceCollection, SiteSettingsCollection, UserCollection
} from "../services/DirectService";
import {FilterFutureRace, MergeCourseUserData, RaceMergeData} from "../models/Race";
import { dateSortCompareOldestFirst} from "../services/sort";
import {FC} from "react";
import {GetStaticProps} from "next";
import {SiteSetting} from "../models/SiteSetting";
import {BaseList} from "../models/base";
import RaceList from "../components/RaceList";

type RaceProps = {
  siteSetting: SiteSetting
  races: BaseList<RaceMergeData>
}

export const Races: FC<RaceProps> = ({siteSetting, races}) =>{
  const image = siteSetting.data?.HomePageImage ? siteSetting.data.HomePageImage : '';

  return (
    <PublicLayout title={"Eureka Cycling Racing Calendar"} leadParagraph={""} heroImage={image} small>
          <RaceList races={races} />
    </PublicLayout>
  )
}
export default Races

export const getStaticProps: GetStaticProps<RaceProps> = async () => {

  const courses = await CoursesCollection(process.env.FAUNADB_SECRET || '').list()
  const users = await UserCollection(process.env.FAUNADB_SECRET || '').list()

  const races = (await RaceCollection(process.env.FAUNADB_SECRET || '').list())
      .filter(FilterFutureRace())
      .map(MergeCourseUserData(courses, users))
      .sort(dateSortCompareOldestFirst)

  const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

  return {props: {races, siteSetting}}
}



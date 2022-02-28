import '../styles/Home.module.css'
import PublicLayout from "../layout/public";
import {CoursesCollection, RaceCollection, SiteSettingsCollection, UserCollection} from "../services/DirectService";
import {FilterPastRace, MergeCourseUserData, Race, RaceData, RaceMergeData} from "../models/Race";
import {dateSortCompareNewestFirst} from "../services/sort";
import {FC} from "react";
import {GetStaticProps} from "next";
import {SiteSetting} from "../models/SiteSetting";
import {BaseList, BaseModel} from "../models/base";
import {ResultsList} from "../components/ResultList";

type RaceProps = {
  siteSetting: SiteSetting
  races: BaseList<RaceMergeData>
}

export const Races: FC<RaceProps> = ({siteSetting, races}) =>{
  const image = siteSetting.data?.HomePageImage ? siteSetting.data.HomePageImage : '';

  return (
    <PublicLayout title={"Eureka Cycling Racing Calendar"} leadParagraph={""} heroImage={image} small>
          <ResultsList races={races} />
    </PublicLayout>
  )
}
export default Races

function FilterRaceYear(year: number) {
  return (r: BaseModel<RaceData>) => {
    return r.data?.Date?.substring(0, 4) == `${year}`;
  }
}

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<RaceProps> = async () => {

  const courses = await CoursesCollection(process.env.FAUNADB_SECRET || '').list()
  const users = await UserCollection(process.env.FAUNADB_SECRET || '').list()
  const year = (new Date()).getFullYear();

  const races = (await RaceCollection(process.env.FAUNADB_SECRET || '').list())
      .filter(FilterPastRace())
      .filter(FilterRaceYear(year))
      .map(MergeCourseUserData(courses, users))
      .sort(dateSortCompareNewestFirst)

  const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

  return {props: {races, siteSetting}, revalidate: 60}
}



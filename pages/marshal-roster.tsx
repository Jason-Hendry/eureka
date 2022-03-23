import '../styles/Home.module.css'
import PublicLayout from "../layout/public";
import {
  CoursesCollection,
  RaceCollection, SiteSettingsCollection, UserCollection
} from "../services/DirectService";
import {FilterFutureRace, getRaceDate, MergeCourseUserData, RaceMergeData} from "../models/Race";
import { dateSortCompareOldestFirst} from "../services/sort";
import {FC} from "react";
import {GetStaticProps} from "next";
import {SiteSetting} from "../models/SiteSetting";
import {BaseList} from "../models/base";
import {format} from "date-fns";
import nl2br from "react-nl2br";

type RaceProps = {
  siteSetting: SiteSetting
  races: BaseList<RaceMergeData>
}

export const Races: FC<RaceProps> = ({siteSetting, races}) =>{
  const image = siteSetting.data?.HomePageImage ? siteSetting.data.HomePageImage : '';

  const marshalsDates = races.reduce<Record<string, Date[]>>((marshalDates, r) => {
      r.data.Marshals?.split("\n").forEach(marshal => {
        let raceDate = getRaceDate(r);
        console.log(raceDate)
        console.log(marshal)
        if(raceDate) {
          if (marshalDates[marshal]) {
            marshalDates[marshal].push(raceDate)
          } else {
            marshalDates[marshal] = [raceDate]
          }
        }
      })
    return marshalDates
  }, {})

  const dates = (Object.values(marshalsDates)).reduce<Date[]>((dates, mr) => {
    mr.forEach(d => {
      if(!dates.some(t => t.getTime() === d.getTime())) {
        dates.push(d)
      }
    })
    return dates
  }, []).sort((a,b) => {
    let aTime = a.getTime();
    let bTime = b.getTime();
    if(aTime === bTime) {
      return 0
    }
    return aTime > bTime ? -1 : 1
  })


  const marshals = Object.keys(marshalsDates).sort()


  function isRostered(marshalsDates: Record<string, Date[]>, m: string, d: Date): boolean {
    return marshalsDates?.[m]?.some((md) => d.getTime() == md.getTime()) || false
  }

  return (
    <PublicLayout title={"Eureka Cycling Marshal Roster"} leadParagraph={""} heroImage={image} small>
      <table>
        <thead>
            <tr>
              <td style={{backgroundColor:"#000"}}>&nsbp;</td>
              {dates.map(d => <td key={d.getTime()} style={{backgroundColor:"#000", textAlign:"center", width: 48, color: "#fff"}}>{nl2br(format(d, "MMM-dd").replace('-',"\n"))}</td>)}
            </tr>
        </thead>
        <tbody>
          {marshals.map((m,i) => <tr key={m} style={{backgroundColor: i%2==0 ? "#ccc" : "#fff"}}>
            <td>{m}</td>
            {dates.map(d => <td key={d.getTime()} style={{backgroundColor: isRostered(marshalsDates, m, d) ? "rgb(0,84,166)" : "#fff"}}>&nbsp;</td>)}
          </tr>)}
        </tbody>
      </table>
    </PublicLayout>
  )
}
export default Races

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<RaceProps> = async () => {

  const courses = await CoursesCollection(process.env.FAUNADB_SECRET || '').list()
  const users = await UserCollection(process.env.FAUNADB_SECRET || '').list()

  const races = (await RaceCollection(process.env.FAUNADB_SECRET || '').list())
      .filter(FilterFutureRace())
      .map(MergeCourseUserData(courses, users))
      .sort(dateSortCompareOldestFirst)

  const siteSetting = (await SiteSettingsCollection(process.env.FAUNADB_SECRET || '').get(process.env.SITE_SETTINGS_ID || ''))

  return {props: {races, siteSetting}, revalidate: 60}
}



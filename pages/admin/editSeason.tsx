import React, {FC, useEffect, useState} from "react"
import {
    Checkbox,
    Container, FormControlLabel,
    Paper,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {CoursesCollectionApi, RaceCollectionApi} from "../../services/APIService";
import {dateSortCompareNewestFirst, dateSortCompareOldestFirst, thisYear} from "../../services/sort";
import {BlankRace, FilterFutureRace, RaceData, RaceFormat} from "../../models/Race";
import {BaseList, BaseModel} from "../../models/base";
import Link from "next/link";
import {CourseData, GetCourse} from "../../models/Course";
import {useAdminListHooks} from "../../effects/loadApiEffect";
import {AdminForm} from "../../components/form/AdminForm";
import {RepeatSection} from "../../components/form/RepeatSection";
import DateField from "../../components/form/DateField";
import {Title} from "@material-ui/icons";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import CollectionSelectField from "../../components/form/CollectionSelectField";
import EnumSelectField from "../../components/form/EnumSelectField";


export function LastDatePlus7(season: Array<BaseModel<RaceData>> | undefined, year: number): string {
    const list: BaseList<RaceData> = [...season || []]
    list.sort(dateSortCompareNewestFirst).filter(thisYear(year))
    if(list.length && list[0].data.Date) {
        const lastData = list[0].data.Date
        const date = new Date(new Date(lastData+"T00:00:00.000Z").getTime() + 1000*3600*24*7)
        return date.toISOString().substring(0,10)
    }
    return ""
}

export const AdminIndex:FC<unknown> = () => {

    const {list: upcomingRaces, secret} = useAdminListHooks(RaceCollectionApi)
    const [courses, setCourses] = useState<BaseList<CourseData>>([])
    const [errors, setErrors] = useState<string>("")
    const [season, setSeason] = useState<BaseList<RaceData>>()

    useEffect(() => {
        setSeason(upcomingRaces.sort(dateSortCompareOldestFirst).filter(thisYear(year)).filter(hidePreviousFilter))
    }, [upcomingRaces])

    const year = (new Date()).getFullYear();

    useEffect(() => {
        CoursesCollectionApi(secret).list().then(setCourses)
    }, [secret])

    const [ hidePrevious, setHidePrevious ] = useState<boolean>(true);
    const hidePreviousFilter = (a: BaseModel<RaceData>): boolean => {
        return hidePrevious? FilterFutureRace()(a) : true
    }

    const save = () => {
        if(season) {
            Promise.all<BaseModel<RaceData>>(season.map((race) => {
                if (race.id != "") {
                    return RaceCollectionApi(secret).put(race.data, race.id)
                }
                return RaceCollectionApi(secret).post(race.data)
            })).then((...v) => setSeason(...v))
        }
    }
    const RaceFormatSet = Object.keys(RaceFormat).map((k) => RaceFormat[k as keyof typeof RaceFormat])


    return <Paper>
        <Container>
            <br/>
            <Typography variant={"h5"}>{year} Season</Typography>
            <br/>

            <AdminForm label={'Season'} deleteRecord={null} isEdit={true} save={save} errors={errors}>
                <RepeatSection id={"races"} value={season || [] as BaseList<RaceData>} label={"Races"} onChange={v => {
                    if (v) {
                        setSeason(v)
                    }
                }} section={(v,m,i) => <>
                    <DateField id={"date"+i} value={v.data?.Date || null} label={"Date"} onChange={newValue => m({data: {...v.data, Date: newValue || undefined}})} />
                    <EnumSelectField id={"raceFormat"+i} label={"Race Format"} enumSet={RaceFormatSet} value={v.data?.RaceFormat || null} onChange={nv => m({data: {...v.data, RaceFormat: nv || undefined}})} />
                    <SingleLineTextField id={"title"+i} value={v.data?.Title || null} label={"Title"} onChange={newValue => m({data: {...v.data, Title: newValue || ""}})} />
                    <CollectionSelectField id={"course"+i} label={"Course"} value={v.data.Course || ""} collection={CoursesCollectionApi}
                                           getLabel={(v) => v.Title} onChange={newValue => m({data: {...v.data, Course: newValue || undefined}})} />
                </>} blank={() => ({id: "", data: {...BlankRace(), Date: LastDatePlus7(season, year)}})} />
            </AdminForm>
        </Container>
    </Paper>

}

export default AdminIndex

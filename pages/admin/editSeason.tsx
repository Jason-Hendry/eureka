import React, {FC, useContext, useEffect, useState} from "react"
import {
    Container, Paper,
    Typography
} from "@mui/material";
import {CoursesCollectionApi, RaceCollectionApi} from "../../services/APIService";
import {dateSortCompareNewestFirst, dateSortCompareOldestFirst, thisYear} from "../../services/sort";
import {BlankRace, RaceData, RaceFormat} from "../../models/Race";
import {BaseList, BaseModel} from "../../models/base";
import {useAdminListHooks} from "../../effects/loadApiEffect";
import {AdminForm} from "../../components/form/AdminForm";
import {RepeatSection} from "../../components/form/RepeatSection";
import DateField from "../../components/form/DateField";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import CollectionSelectField from "../../components/form/CollectionSelectField";
import EnumSelectField from "../../components/form/EnumSelectField";
import {CollectionCache, CollectionCacheProxyBuilder} from "../../layout/Admin/CollectionCache";
import {CourseData} from "../../models/Course";


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
    const [errors, setErrors] = useState<string>("")
    const [season, setSeason] = useState<BaseList<RaceData>>()
    const year = (new Date()).getFullYear();
    const collectionCache = useContext(CollectionCache)

    useEffect(() => {
        setSeason(upcomingRaces.sort(dateSortCompareOldestFirst).filter(thisYear(year)))
    }, [upcomingRaces, year])

    const save = () => {
        if(season) {
            Promise.all<BaseModel<RaceData>>(season.map((race) => {
                if (race.id != "") {
                    return RaceCollectionApi(secret).put(race.data, race.id)
                }
                return RaceCollectionApi(secret).post(race.data)
            }))
                .then((...v) => setSeason(...v))
                .catch(setErrors)
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
                    <CollectionSelectField<CourseData> id={"course"+i} label={"Course"} value={v.data.Course || ""} collection={CollectionCacheProxyBuilder(CoursesCollectionApi, collectionCache.get('course'))}
                                           getLabel={(v) => v.Title} onChange={newValue => m({data: {...v.data, Course: newValue || undefined}})} />
                </>} blank={() => ({id: "", data: {...BlankRace(), Date: LastDatePlus7(season, year)}})} />
            </AdminForm>
        </Container>
    </Paper>

}

export default AdminIndex

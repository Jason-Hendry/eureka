import React, {useEffect, VFC} from "react"
import {RaceCollectionApi} from "../../services/APIService";
import {
    BlankDivisionResult,
    BlankResultPlaces,
    BlankResultPlacesWithFastest,
    RaceData,
    ResultPlace
} from "../../models/Race";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import {useAdminEffects} from "../../effects/useAdminEffects";
import {AdminForm} from "../../components/form/AdminForm";
import AdminLoading from "../../layout/Admin/AdminLoading";
import {useRouterPush} from "../../effects/useRouterPush";
import {RepeatSection} from "../../components/form/RepeatSection";
import {hasDivisions} from "../../common/hasDivisions";
import NumberField from "../../components/form/NumberField";

const divisionalResults = (data: RaceData, merge: (newValue: Partial<RaceData>) => void) => {
    return <RepeatSection sortable={false} id={"scratchDivisions"} value={data.divisionResults || []}
                          label={"Scratch Divisions"} onChange={v => merge({divisionResults: v || undefined})}
                          section={(v, m) => (
                              <>
                                  <h2>Division {v.divisionNumber}</h2>
                                  {placeResults(v, m)}
                              </>
                          )
                          } blank={BlankDivisionResult(3)}/>
}

function nextPosition(results: ResultPlace[] | undefined): number {
    return (results?.map(r => r.position).reduce((max, v) => Math.max(max, v), 0) || 0) + 1
}

function nicePosition(position: number): string {
    if (position == -1) {
        return 'Fastest Time'
    }

    const strNUm = `${position}`
    const end = strNUm[strNUm.length - 1]
    switch (end) {
        case '1':
            return strNUm + 'st'
        case '2':
            return strNUm + 'nd'
        case '3':
            return strNUm + 'rd'
        default:
            return strNUm + 'th'
    }
}

const placeResults = (data: { results?: ResultPlace[] }, merge: (newValue: Partial<{ results: ResultPlace[] }>) => void) => {
    return <RepeatSection sortable={false} id={"scratchDivisions"} value={data.results || []} label={"Place"}
                          onChange={v => merge({results: v || undefined})} section={(v, m, i) => (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div>
                {nicePosition(v.position)}
            </div>
            <div style={{flexGrow: 1}}>
                <SingleLineTextField id={"rider" + i} value={`${v.rider}`} label={"Rider"}
                                     onChange={v => m({rider: v || undefined})}/>
            </div>
            <div>
                <NumberField id={"points" + i} value={v.aggregatePoints} label={"Points"}
                             onChange={v => m({aggregatePoints: v || undefined})}/>
            </div>
        </div>
    )
    } blank={() => ({
        position: nextPosition(data.results),
        rider: "",
        aggregatePoints: 0
    })}/>
}


const AdminIndex: VFC = () => {
    const returnToList = useRouterPush('/admin/races')
    const {
        save,
        merge,
        data: race,
        isEdit,
        errors
    } = useAdminEffects<RaceData>(RaceCollectionApi, () => ({Title: ""}), returnToList)

    useEffect(() => {
        console.log(hasDivisions(race?.RaceFormat))
        if (race && race.divisionResults === undefined && hasDivisions(race?.RaceFormat)) {
            merge({
                divisionResults: Array.from({length: 4}, (_, i) => ({
                    ...BlankDivisionResult(3)(),
                    divisionNumber: i + 1
                }))
            })
            console.log(race)
        }
        if (race && race.results === undefined && !hasDivisions(race?.RaceFormat)) {
            merge({results: BlankResultPlacesWithFastest(5)})
        }
    }, [merge, race])

    if (!race) {
        return <AdminLoading/>
    }

    const resultType = hasDivisions(race.RaceFormat) ? divisionalResults(race, merge) : placeResults(race, merge)

    return <AdminForm label={`Race Results ${race.Date} ${race.Title} ${race.RaceFormat}`} deleteRecord={null}
                      isEdit={isEdit} save={save} errors={errors}>
        {resultType}
    </AdminForm>

}

export default AdminIndex

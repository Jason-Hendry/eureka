import {BaseList} from "../models/base";
import {DivisionResult, RaceData, RaceMergeData, RaceTitle, ResultPlace} from "../models/Race";
import {nicePosition} from "../pages/admin/results";


function DivisionalResult({results}: { results: DivisionResult[] }) {
    return <>
        {results.map(d => {
            return <>
                <h2>Division {d.divisionNumber}</h2>
                <PositionalResults results={d.results}/>
            </>
        })}
    </>;
}

function Place({place}: { place: ResultPlace }) {
    return <div>{nicePosition(place.position)} - {place.rider}</div>;
}

function PositionalResults({results}: { results: ResultPlace[] | undefined }) {
    if (!results) {
        return null
    }
    return <>
        {results.map(r => <Place key={r.position} place={r}/>)}
    </>
}

function Result({data}: { data: RaceMergeData }) {

    if(!data?.divisionResults?.length && !data?.results?.length) {
        return null
    }

    const result = data.divisionResults?.length ? <DivisionalResult results={data.divisionResults}/> :
        <PositionalResults results={data.results}/>

    return <div>
        <h1>{RaceTitle(data)}</h1>
        {result}
    </div>
}

export function ResultsList({races}: { races: BaseList<RaceMergeData> }) {
    return <>
        {races.map(r => <Result key={r.id} data={r.data}/>)}
    </>;
}
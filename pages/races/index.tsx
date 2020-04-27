import fetch from 'node-fetch'
import authorize from "../../google/auth";
import {listMajors} from "../api/races";
import {format} from 'date-fns'

export default function Race({races}) {

    const raceList = races.sort((a,b) => a.sort-b.sort).map(r => <li>{r.Title} - {r.Course}</li>)

    return <div>{raceList}</div>
}

//
// // @ts-ignore
// export async function getStaticPaths() {
//     const data = await listMajors(authorize())
//
//     const paths = {
//         paths: data.map(r => {
//             // const raceDate = parse(r.Date.substr(0, 10), 'yyyy-MM-dd\THH:mm:ss.000X', new Date())
//             const race = format(r.Date, 'yyyy-MM-dd')
//             return {params:{race}};
//         }),
//         fallback: false
//     }
//     return paths
// }

// @ts-ignore
export async function getStaticProps() {
    const data = await listMajors(authorize())

    return {props: {races: data.map(r => {
        console.log(typeof r.Date)
        // r['sort'] = parseInt(format(r.Date, 'yyyy'))
        // r['month'] = format(r.Date, 'MMMM')
        delete r['Timestamp']
        delete r['Date']
        return r
    })}}
}



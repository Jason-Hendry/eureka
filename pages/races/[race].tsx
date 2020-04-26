import fetch from 'node-fetch'
import authorize from "../../google/auth";
import {listMajors} from "../api/races";
import {parse,format} from 'date-fns'

export default function Race({race}) {
    return <h1>Race - {race}</h1>
}


// @ts-ignore
export async function getStaticPaths() {

    const data = await listMajors(authorize())

    // console.log('Data: ', data)

    const paths = {
        paths: data.map(r => {

            // const raceDate = parse(r.Date.substr(0, 10), 'yyyy-MM-dd\THH:mm:ss.000X', new Date())
            const race = format(r.Date, 'yyyy-MM-dd')
            console.log(race);
            return {params:{race}};
        }),
        fallback: false
    }
    console.log(paths)
    return paths
}

// @ts-ignore
export async function getStaticProps({params: {race}}) {
    return {props: {race}}
}



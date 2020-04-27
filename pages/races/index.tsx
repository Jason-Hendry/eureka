import fetch from 'node-fetch'
import authorize from "../../google/auth";
import {listMajors} from "../api/races";
import {parse,format} from 'date-fns'

export default function Race({Title, Date, Course}) {
    return <h1>{Title} - {Course}</h1>
}


// @ts-ignore
export async function getStaticPaths() {
    const data = await listMajors(authorize())

    const paths = {
        paths: data.map(r => {
            // const raceDate = parse(r.Date.substr(0, 10), 'yyyy-MM-dd\THH:mm:ss.000X', new Date())
            const race = format(r.Date, 'yyyy-MM-dd')
            return {params:{race}};
        }),
        fallback: false
    }
    return paths
}

// @ts-ignore
export async function getStaticProps({params: {race}}) {
    const data = await listMajors(authorize())

    for(let i=0;i<data.length;i++)
    {
        const r = data[i];
        if(format(r.Date, 'yyyy-MM-dd') === race) {
            delete r['Timestamp']
            delete r['Date']
            return {props: r}
        }
    }
}



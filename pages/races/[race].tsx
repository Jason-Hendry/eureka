import fetch from 'node-fetch'
import {parse,format} from 'date-fns'

export default function Race({Title, Date, Course}) {
    return <h1>{Title} - {Course}</h1>
}


// @ts-ignore
export async function getStaticPaths() {

    const paths = {
        paths: [],
        fallback: false
    }
    return paths
}

// @ts-ignore
export async function getStaticProps({params: {race}}) {
    // const data = await listMajors(authorize())
    //
    // for(let i=0;i<data.length;i++)
    // {
    //     const r = data[i];
    //     if(format(r.Date, 'yyyy-MM-dd') === race) {
    //         delete r['Timestamp']
    //         delete r['Date']
    //         return {props: r}
    //     }
    // }
    return {props:{}}
}



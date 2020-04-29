import React, {useContext, useState} from "react"
import {useRouter} from "next/router";
import {RaceListService} from "../api/races";
import Link from "next/link";
import {Secret} from "../../components/AdminTheme/Secret";

export default function Index(props) {
    const secret = useContext(Secret)
    const [races, setRaces] = useState([])

    if(process.browser) {
        const c = useRouter()
        if (secret == "") {
            c.push("/admin/")
        }
        if(races.length === 0) {
            RaceListService(secret, setRaces, (e) => console.log(e))
        }
    }
    const list = races.map(r => {
        console.log(r)
        return <li>{r.data?.Title ? r.data.Title : 'No name'} <Link href={"/admin/race/"+r.id}>Edit</Link></li>
    })

    return <div>
        {list}
    </div>

}

import React, {useState} from "react"
import AdminActions from "../../../pages-sections/Admin/AdminActions";
import Login from "../../../pages-sections/Admin/Login"
import {useRouter} from "next/router";
import {useLocalStorage} from "../index";
import {RaceListService} from "../../api/races";
// import {RaceGetService} from "../../api/[race]";

export default function Index(props) {
    const [secret, setSecret] = useLocalStorage("secret", "")
    const [race, setRace] = useState([])

    if(process.browser) {
        const c = useRouter()
        if (secret === "") {
            c.push("/admin/")
        }
        if(race.length === 0) {
            RaceGetService(race, secret, setRace, (e) => console.log(e))
        }
    }
    return <div>
        <h1>Edit</h1>
    </div>

}

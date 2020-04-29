import React, {useContext, useState} from "react"
import {RaceService} from "../../pages/api/race";
import {Secret} from "../../components/AdminTheme/Secret";

export default function Admin() {
    const secret = useContext(Secret);


    return <div>Actions

        <button onClick={() => RaceService({Title: "X"}, secret, (a)=>console.log(a), (e)=>console.log(e))}>Add Race</button>

    </div>
}

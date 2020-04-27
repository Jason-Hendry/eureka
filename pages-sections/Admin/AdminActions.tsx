import React, {useState} from "react"
import {RaceService} from "../../pages/api/race";

export default function Admin({logout,secret}) {
    return <div>Actions

        <button onClick={() => RaceService({Title: "X"}, secret, (a)=>console.log(a), (e)=>console.log(e))}>Add Race</button>

        <button onClick={() => logout()}>Logout</button>
    </div>
}

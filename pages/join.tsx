import React, {useContext, useState} from "react"
import {Paper, Typography} from "@material-ui/core";
import PublicLayout from "../layouts/public";

export default function Index(props) {
    return <PublicLayout small={true} heroImage={require('../assets/img/bg7.jpg')} title={"Join Eureka Cycling"}>
        <Paper variant={"outlined"} style={{textAlign: "left", padding: 24}}>
            <p>To join and race with Eureka Cycling you will need an <a
                href={"https://www.auscycling.org.au/membership/race-all-discipline"}>AusCycling Race All Discipline
                Membership</a> and select "Eureka Cycling Club".</p>

                <p>If you are a member of another AusCycling club you can
                join Eureka Cycling Club with a <a
                    href={"https://www.auscycling.org.au/membership/other/club-add"}>Race
                    Member Club Add-On.</a></p>
        </Paper>
    </PublicLayout>
}

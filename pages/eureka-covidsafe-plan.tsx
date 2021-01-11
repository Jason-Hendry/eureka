import React, {useContext, useState} from "react"
import {Paper, Typography} from "@material-ui/core";
import PublicLayout from "../layouts/public";

export default function Index(props) {

    return <PublicLayout small={true} heroImage={require('../assets/img/bg7.jpg')} title={"Eureka COVIDSafe Plan"}>
        <Paper variant={"outlined"} style={{textAlign: "left", padding: 24}}>

            <p>Eureka Cycling Club is committed to providing and maintaining a safe environment at all club events – for competitors, officials and visitors.</p>

            <p>The coronavirus pandemic which commenced in Australia in February/March 2020, required a swift response from Eureka Cycling Club.
                The club ceased bicycle racing in March 2020 and did not resume club events until able to do so with:</p>


            <ol>
                <li>approval from the Victorian State Government and Department of Health and Human Resources</li>
                <li>event permits from City Of Ballarat and Victoria Police</li>
                <li>registration of the Eureka COVIDSafe Plan with the Department of Jobs, Precincts and Regions</li>
            </ol>

            <p>The Eureka COVIDSafe Plan is regularly reviewed to ensure currency as per guidelines and directions from
                the Victorian State Government and Department of Health and Human Resources.</p>

            <p>The Eureka COVIDSafe Plan consists of multiple documents which describe the actions Eureka Cycling Club
                will take in managing safe club events.</p>

            <p>It is the responsibility of all attendees at a Eureka Cycling Club event to adhere to COVID-19 protocols
                as prescribed by the Victorian State Government and Department of Health and Human Resources. Eureka
                Cycling Club’s responsibility is to ensure the club manages a public event as per the guidelines
                prescribed by the Victorian State Government and Department of Health and Human Resources, this
                includes, but is not limited to:</p>

            <ul><li>creating and maintaining a Covid Safe Plan which is current with Government and Health Authority
                guidelines at the time of the event</li>
                <li>ensuring all attendees at a public event staged by the club are aware of the Covid Safe Plan</li>
                <li>ensuring all club members and event attendees have access to the suite of Eureka COVIDSafe Plan
                    documentation in electronic form</li>
            </ul>

            <p>Eureka Pandemic Officer 1 – Dean Wells<br />
                Eureka Pandemic Officer 2 – Roger McMillan</p>

            <h2>Documents</h2>
            <ul>
                <li><a href={'https://images.eurekacycling.org.au/documents/Eureka-COVIDSafe-Plan-Event-Checklist.pdf'}>Eureka COVIDSafe
                    Plan – Event Checklist</a></li>

                <li><a href={'https://images.eurekacycling.org.au/documents/Eureka-COVIDSafe-Plan-25-Nov-2020.pdf'}>Eureka COVIDSafe Plan – 25 Nov 2020</a></li>

                <li><a
                    href={'https://images.eurekacycling.org.au/documents/Eureka-COVIDSafe-Plan-attendance-record-MASTER-ver20201124.pdf'}>Eureka
                    – COVIDSafe Plan – attendance record – MASTER ver20201124</a></li>

                <li><a href={'https://images.eurekacycling.org.au/documents/SWI-Manage-clubrooms-and-buildings.pdf'}>SWI Manage clubrooms and buildings</a></li>

                <li><a href={'https://images.eurekacycling.org.au/documents/SWI-Clean-clubrooms-and-buildings.pdf'}>SWI Clean clubrooms and buildings</a></li>
            </ul>


            <img style={{maxWidth:'100%'}} src={require('../assets/img/Eureka-COVIDSafe-Plan-the-basics-25112020.jpg')}/>

        </Paper>
    </PublicLayout>

}
export async function getStaticProps(props) {
    // console.log(props)
    return {props: {}}
}

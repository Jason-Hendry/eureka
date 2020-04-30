import React, {useContext, useState} from "react"
import {Paper, Typography} from "@material-ui/core";

export default function Index(props) {

    return <Paper>
        <Typography variant={"h6"}>Admin</Typography>
    </Paper>

}
export async function getStaticProps(props) {
    return {props}
}


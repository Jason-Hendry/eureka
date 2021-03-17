import {Card, Grid} from "@material-ui/core";
import React, {FC} from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


export const AdminFormTheme: FC<unknown> = ({children}) => {
    const classes = useStyles();

    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: '100vh'}}
    >

        <Grid item xs={3}>
            <Card className={classes.root} variant="outlined">{children}</Card>
        </Grid>
    </Grid>
}

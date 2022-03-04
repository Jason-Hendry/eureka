import {FC} from "react";
import {makeStyles} from "@mui/styles";
import {BaseList} from "../models/base";
import {RaceMergeData, RaceTitle} from "../models/Race";
import {ISODateToPretty} from "../services/dates";
import {Button, Card, CardActions, CardContent, CardHeader, Theme} from "@mui/material";

interface RaceListProps {
    races: BaseList<RaceMergeData>
    theme: Theme;
    edit?: boolean
}

const useStyles = makeStyles(({spacing}: Theme) => ({
    races: {
        marginBottom: spacing(2),
        textAlign: "left"
    }
}))

export const RaceList: FC<RaceListProps> = ({ races, edit= false}) => {
    const classes = useStyles()

    return (
        <>
            {races.map(r => (
                <Card className={classes.races} key={r.id}>
                    <CardHeader title={RaceTitle(r.data)} subheader={ISODateToPretty(r.data?.Date)}/>
                    <CardContent>
                        {r.data?.CourseData?.data?.Title}
                    </CardContent>
                    <CardActions>
                        {r.data?.RegistrationURL &&
                        <Button variant={"contained"} color={"primary"} href={r.data?.RegistrationURL}>Register Online
                            Now</Button>
                        }
                        <Button href={`/races/${r.id}`}>More Info</Button>
                        {edit && <Button variant={"outlined"} href={`/admin/race#${r.id}`}>Edit</Button>}
                    </CardActions>
                </Card>
            ))}
        </>
    )
}
export default RaceList;

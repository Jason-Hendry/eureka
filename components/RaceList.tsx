import {FC} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Theme, withTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {BaseList} from "../models/base";
import {RaceMergeData, RaceTitle} from "../models/Race";

interface RaceListProps {
    races: BaseList<RaceMergeData>
    theme: Theme;
}

const useStyles = ({spacing}: Theme) => makeStyles({
    races: {
        marginBottom: spacing(2),
        textAlign: "left"
    }
})

export const RaceList: FC<RaceListProps> = ({theme, races}) => {
    const classes = useStyles(theme)()


    return (
        <>
            {races.map(r => (
                <Card className={classes.races} key={r.id}>
                    <CardHeader title={RaceTitle(r.data)} subheader={r.data?.Date}/>
                    <CardContent>
                        {r.data?.CourseData?.data?.Title}
                    </CardContent>
                    <CardActions>
                        {r.data?.RegistrationURL &&
                        <Button variant={"contained"} color={"primary"} href={r.data?.RegistrationURL}>Register Online
                            Now</Button>
                        }
                        <Button href={`/races/${r.id}`}>More Info</Button>
                    </CardActions>
                </Card>
            ))}
        </>
    )
}
export default withTheme(RaceList);

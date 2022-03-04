import {FC} from "react";
import {BaseList, BaseModel} from "../models/base";
import {NewsData} from "../models/News";
import {makeStyles} from "@mui/styles";
import Link from "next/link";
import {ISODateToPretty} from "../services/dates";
import {toURL} from "../services/url";
import {Card, CardContent, CardHeader, Theme, Typography} from "@mui/material";

interface NewsListProps {
    news: BaseList<NewsData>
    theme: Theme;
}

const useStyles = makeStyles(({spacing}: Theme) => ({
        news: {
            marginBottom: spacing(2),
            textAlign: "left"
        }
    })
)

export const NewsList: FC<NewsListProps> = ({news}) => {

    const classes = useStyles()

    const displayDate = (n: BaseModel<NewsData>) => ISODateToPretty(n.data.Date)
    const url = (n: BaseModel<NewsData>) => "/news/" + toURL(n.id)

    return (
        <>
            {news.map(n => (
                <Card className={classes.news} key={n.id}>
                    <CardHeader title={n.data.Title} subheader={displayDate(n)}/>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {n.data.Teaser}
                        </Typography>
                        <Link href={url(n)}><a>Read More</a></Link>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
export default NewsList

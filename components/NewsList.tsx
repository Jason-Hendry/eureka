import {FC} from "react";
import {BaseList, BaseModel} from "../models/base";
import {NewsData} from "../models/News";
import {Card, CardContent, CardHeader, Theme, Typography, withTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Link from "next/link";
import {ISODateToPretty} from "../services/dates";
import {toURL} from "../services/url";

interface NewsListProps {
    news: BaseList<NewsData>
    theme: Theme;
}

const useStyles = ({spacing}: Theme) => makeStyles({
    news: {
        marginBottom: spacing(2),
        textAlign: "left"
    }
})

export const NewsList: FC<NewsListProps> = ({news, theme}) => {

    const classes = useStyles(theme)()

    const displayDate = (n: BaseModel<NewsData>) => ISODateToPretty(n.data.Date)
    const url  = (n: BaseModel<NewsData>) =>  "/news/" + toURL(n.id)

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
export default withTheme(NewsList);

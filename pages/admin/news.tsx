import React, {useContext, useState} from "react"
import {useRouter} from "next/router";
import Link from "next/link";
import {Secret} from "../../components/AdminTheme/Secret";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Theme, Toolbar,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {DocListNews, DocPostNews} from "../../services/APIService";
import {NewsList} from "../../models/News";

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        '&:hover': {
            background: theme.palette.action.hover,
        }
    },
    heading: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    tableHeading: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    newNews: {
        marginRight: theme.spacing(1)
    }
}))

export default function Index(props) {
    const secret = useContext(Secret)
    const [news, setNews] = useState<NewsList>([])
    const classes = useStyles()
    const router = useRouter()

    if (process.browser) {
        if (news.length === 0) {
            DocListNews(secret).then(list => setNews(list)).catch(e => setNews([]))
        }
    }

    const newNews = () => {
        DocPostNews( {Title:""}, secret).then(({id}) => router.push(`/admin/newsArticle/edit#${id}`)).catch(e => {});
    }

    const list = news.map((r, i) => {
        console.log(r)
        return <TableRow key={i} className={classes.row}>
            <TableCell>{r.data.Title ? r.data.Title : '- No name -'}</TableCell>
            <TableCell>
                <Button variant={"text"}><Link href={"/admin/newsArticle/edit#" + r.id}>Edit</Link></Button>
            </TableCell>
        </TableRow>
    })

    return <TableContainer component={Paper}>
            <Toolbar className={classes.tableHeading}>
                <Typography variant={"h6"} component={"div"}>Manage News</Typography>
                <Button variant={"contained"} color={"primary"} className={classes.newNews} onClick={newNews}>New News</Button>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell variant={"head"}>Title</TableCell>
                        <TableCell variant={"head"}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list}
                </TableBody>
            </Table>
        </TableContainer>

}
export async function getStaticProps(props) {
    return {props: {}}
}

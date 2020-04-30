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
import {DocListResults, DocPostResults} from "../../services/DocumentService";
import {ResultsList} from "../../models/Results";

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
    newResults: {
        marginRight: theme.spacing(1)
    }
}))

export default function Index(props) {
    const secret = useContext(Secret)
    const [results, setResults] = useState<ResultsList>([])
    const classes = useStyles()
    const router = useRouter()

    if (process.browser) {
        if (results.length === 0) {
            DocListResults(secret).then(list => setResults(list)).catch(e => setResults([]))
        }
    }

    const newResults = () => {
        DocPostResults( {Title:""}, secret).then(({id}) => router.push(`/admin/result/edit#${id}`)).catch(e => {});
    }

    const list = results.map((r, i) => {
        console.log(r)
        return <TableRow key={i} className={classes.row}>
            <TableCell>{r.data.Title ? r.data.Title : '- No name -'}</TableCell>
            <TableCell>
                <Button variant={"text"}><Link href={"/admin/result/edit#" + r.id}>Edit</Link></Button>
            </TableCell>
        </TableRow>
    })

    return <TableContainer component={Paper}>
            <Toolbar className={classes.tableHeading}>
                <Typography variant={"h6"} component={"div"}>Manage Results</Typography>
                <Button variant={"contained"} color={"primary"} className={classes.newResults} onClick={newResults}>New Results</Button>
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
    return {props}
}

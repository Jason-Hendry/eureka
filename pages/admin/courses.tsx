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
import {DocListCourses, DocPostCourse} from "../../services/DocumentService";
import {CourseList} from "../../models/Course";

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
    newCourse: {
        marginRight: theme.spacing(1)
    }
}))

export default function Index(props) {
    const secret = useContext(Secret)
    const [courses, setCourses] = useState<CourseList>([])
    const classes = useStyles()
    const router = useRouter()

    if (process.browser) {
        if (courses.length === 0) {
            DocListCourses(secret).then(list => setCourses(list)).catch(e => setCourses([]))
        }
    }

    const newCourse = () => {
        DocPostCourse( {Title:""}, secret).then(({id}) => router.push(`/admin/course/${id}`)).catch(e => {});
    }

    const list = courses.map((r, i) => {
        console.log(r)
        return <TableRow key={i} className={classes.row}>
            <TableCell>{r.data.Title ? r.data.Title : '- No name -'}</TableCell>
            <TableCell>
                <Button variant={"text"}><Link href={"/admin/course/" + r.id}><a>Edit</a></Link></Button>
            </TableCell>
        </TableRow>
    })

    return <TableContainer component={Paper}>
            <Toolbar className={classes.tableHeading}>
                <Typography variant={"h6"} component={"div"}>Manage Courses</Typography>
                <Button variant={"contained"} color={"primary"} className={classes.newCourse} onClick={newCourse}>New Course</Button>
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

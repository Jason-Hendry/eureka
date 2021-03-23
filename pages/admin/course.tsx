import React, {FC} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    Theme,
    Typography, withTheme
} from "@material-ui/core";
import {CoursesCollectionApi} from "../../services/APIService";
import {makeStyles} from "@material-ui/styles";
import {useAdminEffects} from "../../effects/loadApiEffect";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import AdminLoading from "../../layout/Admin/AdminLoading";

const useStyles = (theme: Theme) => makeStyles({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    raceImage: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
})
const inputProps = {
    step: 300,
};

type RaceProps = {
    theme: Theme;
}

const AdminIndex: FC<RaceProps> = ({theme}) => {
    const {save, data: course, merge, isEdit} = useAdminEffects(CoursesCollectionApi, () => ({Title: ""}))

    if (!course) {
        return <AdminLoading/>
    }

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{isEdit ? 'Edit' : 'Create New '} Course</Typography>

            <form onSubmit={e => e.preventDefault()}>
                <SingleLineTextField
                    label={'Title'}
                    onChange={(e) => merge({Title: e})}
                    value={course.Title}
                />

                <FormControl fullWidth={true} margin={"normal"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"}
                            onClick={save}>{isEdit ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>

}

export default withTheme(AdminIndex)

import React, {FC} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    Theme,
    Typography, withTheme
} from "@material-ui/core";
import {CoursesCollectionApi} from "../../services/APIService";
import {useAdminEffects} from "../../effects/loadApiEffect";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import AdminLoading from "../../layout/Admin/AdminLoading";

type RaceProps = {
    theme: Theme;
}

const AdminIndex: FC<RaceProps> = ({}) => {
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
                    onChange={(e) => merge({Title: e || ''})}
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

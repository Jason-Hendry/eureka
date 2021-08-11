import React, {FC} from "react"
import {Container, Paper, Theme, Typography, withTheme} from "@material-ui/core";
import {CoursesCollectionApi} from "../../services/APIService";
import {useAdminEffects} from "../../effects/loadApiEffect";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import AdminLoading from "../../layout/Admin/AdminLoading";
import {SaveCreateButton} from "../../components/form/SaveCreateButton";

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
                    id={'title'}
                />
                <SaveCreateButton isEdit={isEdit} save={save}/>
            </form>
        </Container>
    </Paper>
}

export default withTheme(AdminIndex)

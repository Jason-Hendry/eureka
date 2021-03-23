import React, {FC} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    Typography, withTheme
} from "@material-ui/core";
import {UserCollectionApi} from "../../services/APIService";
import { useAdminEffects} from "../../effects/loadApiEffect";
import {UserData} from "../../models/User";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import EmailField from "../../components/form/EmailField";

const AdminIndex:FC<unknown> = () => {
    const {save, data: user, merge} = useAdminEffects<UserData>(UserCollectionApi, () => ({name: "", email: ""}))

    if(!user) {
        return <Paper>
            <Container>Loading...</Container>
        </Paper>
    }

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{document.location.hash.length ? 'Edit' : 'Create New '} Course</Typography>

            <form onSubmit={e => e.preventDefault()}>
                <SingleLineTextField label={'Title'} onChange={(v) => merge({name: v})} value={user.name}/>
                <EmailField label={'Title'} onChange={(v) => merge({email: v})} value={user.email}/>

                <FormControl fullWidth={true} margin={"normal"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"} onClick={save}>{document.location.hash.length ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>

}

export default withTheme(AdminIndex)

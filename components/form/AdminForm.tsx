import {Container, Paper, Typography} from "@material-ui/core";
import React, {FC} from "react";
import {SaveCreateButton} from "./SaveCreateButton";



export const AdminForm: FC<{isEdit:boolean, save:() => void, label: string}> = ({isEdit, save, label, children}) => {
        return <Paper>
            <Container>
                <Typography variant={"h6"}>{isEdit ? 'Edit' : 'Create New '} {label}</Typography>

                <form onSubmit={e => e.preventDefault()}>
                    {children}
                    <SaveCreateButton isEdit={isEdit} save={save}/>
                </form>
            </Container>
        </Paper>
}


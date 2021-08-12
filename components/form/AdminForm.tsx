import {Container, Paper, Typography} from "@material-ui/core";
import React, {FC} from "react";
import {SaveCreateButton} from "./SaveCreateButton";
import {Alert} from "@material-ui/lab";
import {DeleteButton} from "./DeleteButton";

export const AdminForm: FC<{isEdit:boolean, save:() => void, deleteRecord:() => void, label: string, errors: string}> = ({isEdit, deleteRecord, save, label, errors, children}) => {
        return <Paper>
            <Container>
                <Typography variant={"h6"}>{isEdit ? 'Edit' : 'Create New '} {label}</Typography>

                {errors && <Alert color={"error"}>{errors}</Alert>}

                <form onSubmit={e => e.preventDefault()}>
                    {children}
                    <SaveCreateButton isEdit={isEdit} save={save}/>
                </form>
                <DeleteButton isEdit={isEdit} deleteRecord={deleteRecord}/>
            </Container>
        </Paper>
}


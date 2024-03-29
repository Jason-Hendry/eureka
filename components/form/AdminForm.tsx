import {Container, Paper, Typography} from "@mui/material";
import React, {FC} from "react";
import {SaveCreateButton} from "./SaveCreateButton";
import {Alert} from "@mui/lab";
import {DeleteButton} from "./DeleteButton";

type AdminFormProps = {
    isEdit: boolean,
    save: () => void,
    deleteRecord: (() => void)|null,
    label: string,
    errors: string
}

export const AdminForm: FC<AdminFormProps> = ({isEdit, deleteRecord, save, label, errors, children}) => {
        return <Paper>
            <Container>
                <Typography variant={"h6"}>{isEdit ? 'Edit' : 'Create New '} {label}</Typography>

                {errors && <Alert color={"error"}>{errors}</Alert>}

                <form onSubmit={e => e.preventDefault()}>
                    {children}
                    <SaveCreateButton isEdit={isEdit} save={save}/>
                </form>
                {deleteRecord !== null && <DeleteButton isEdit={isEdit} deleteRecord={deleteRecord}/>}
            </Container>
        </Paper>
}


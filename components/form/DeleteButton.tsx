import React, {VFC} from "react";
import {Button, FormControl} from "@mui/material";

export type DeleteButtonProps = {
    isEdit: boolean,
    deleteRecord: () => void
}

export const DeleteButton: VFC<DeleteButtonProps> = ({deleteRecord, isEdit}) => {
    if (!isEdit) {
        return null
    }
    return <FormControl fullWidth={true} margin={"normal"}>
        <Button type={"button"} variant={"contained"} color={"secondary"} onClick={deleteRecord}>Delete</Button>
    </FormControl>
}
import React, {VFC} from "react";
import {Button, FormControl} from "@material-ui/core";

export const SaveCreateButton: VFC<{ isEdit: boolean, save: () => void }> = ({save, isEdit}) => <FormControl
    fullWidth={true} margin={"normal"}>
    <Button type={"submit"} variant={"contained"} color={"primary"}
            onClick={save}>{isEdit ? 'Save' : 'Create'}</Button>
</FormControl>
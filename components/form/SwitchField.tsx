import React, {FC} from "react";
import {makeStyles} from "@material-ui/styles";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {FormControl, FormLabel, Switch, TextField} from "@material-ui/core";


export const SwitchField: FC<BaseFieldProps<boolean>> = ({label, onChange, value}) => {
    return (
        <>
            <FormControl margin={"normal"}>
                <FormLabel>{label}</FormLabel>
                <Switch
                    color={"secondary"}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                />
            </FormControl>

        </>
    )
}
export default SwitchField;

import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {FormControl, FormLabel, Switch} from "@mui/material";


export const SwitchField: FC<BaseFieldProps<boolean>> = ({label, onChange, value, id}) => {
    return (
        <>
            <FormControl margin={"normal"}>
                <FormLabel id={id}>{label}</FormLabel>
                <Switch
                    id={id}
                    color={"secondary"}
                    checked={value === null ? false : value}
                    onChange={(e) => onChange(e.target.checked)}
                />
            </FormControl>

        </>
    )
}
export default SwitchField;

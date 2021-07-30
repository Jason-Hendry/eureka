import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {FormControl, FormLabel, Switch} from "@material-ui/core";


export const SwitchField: FC<BaseFieldProps<boolean>> = ({label, onChange, value}) => {
    return (
        <>
            <FormControl margin={"normal"}>
                <FormLabel>{label}</FormLabel>
                <Switch
                    color={"secondary"}
                    checked={value === null ? false : value}
                    onChange={(e) => onChange(e.target.checked)}
                />
            </FormControl>

        </>
    )
}
export default SwitchField;

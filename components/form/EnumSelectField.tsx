import React, {FC, PropsWithChildren} from "react";
import {makeStyles} from "@material-ui/styles";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {FormControl, FormLabel, Switch, TextField} from "@material-ui/core";
import EnumSelect from "../../layout/Admin/EnumSelect";
import {RaceFormat} from "../../models/Race";


export function EnumSelectField<T extends string>({label, onChange, value, enumSet}: PropsWithChildren<BaseFieldProps<T> & {enumSet: T[]}>): JSX.Element {
    return (
        <>
            <FormControl fullWidth={true} margin={"normal"}>
                <FormLabel>{label}</FormLabel>
                <EnumSelect<T>
                    enumSet={enumSet}
                    fullWidth={true}
                    value={value}
                    onChange={(val) => onChange(val)}>
                </EnumSelect>
            </FormControl>
        </>
    )
}
export default EnumSelectField;

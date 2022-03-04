import React, {PropsWithChildren} from "react";
import {BaseFieldProps} from "./BaseField";
import {FormControl, FormLabel} from "@mui/material";
import EnumSelect from "../../layout/Admin/EnumSelect";
import {GetUniqueId} from "./GetUniqueId";

export type EnumSelectFieldProps<T> =  PropsWithChildren<BaseFieldProps<T> & {enumSet: T[]}>

export function EnumSelectField<T extends string>({label, onChange, value, enumSet, id}: EnumSelectFieldProps<T>): JSX.Element {

    const fieldId = GetUniqueId(id)

    return (
        <>
            <FormControl fullWidth={true} margin={"normal"}>
                <FormLabel htmlFor={fieldId}>{label}</FormLabel>
                <EnumSelect<T>
                    inputProps={{id:fieldId}}
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

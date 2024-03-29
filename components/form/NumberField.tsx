import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@mui/material";


export const NumberField: FC<BaseFieldProps<number>> = ({label, onChange, value, id}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       id={id}
                       onChange={(e) => onChange(Number.parseInt(e.target.value))}
                       value={value || ""}
                       type={'number'}
            />
        </>
    )
}
export const InlineNumberField: FC<BaseFieldProps<number>> = ({label, onChange, value, id}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                fullWidth={false}
                       label={label}
                       id={id}
                       onChange={(e) => onChange(Number.parseInt(e.target.value))}
                       value={value || ""}
                       type={'number'}
            />
        </>
    )
}
export default NumberField;


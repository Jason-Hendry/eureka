import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@mui/material";


export const SingleLineTextField: FC<BaseFieldProps<string>> = ({label, onChange, value, id,placeholder}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       onChange={(e) => onChange(e.target.value)}
                       value={value || ""}
                       placeholder={placeholder}
                       id={id}
            />
        </>
    )
}
export const InlineSingleLineTextField: FC<BaseFieldProps<string>> = ({label, onChange, value, id,placeholder}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                fullWidth={false}
                       label={label}
                       onChange={(e) => onChange(e.target.value)}
                       value={value || ""}
                       placeholder={placeholder}
                       id={id}
            />
        </>
    )
}
export default SingleLineTextField;

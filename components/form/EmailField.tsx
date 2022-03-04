import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@mui/material";


export const EmailField: FC<BaseFieldProps<string>> = ({label, onChange, value, id}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                        InputProps={{type:"email"}}
                       label={label}
                       onChange={(e) => onChange(e.target.value)}
                       value={value || ""}
                       id={id}
            />
        </>
    )
}
export default EmailField;

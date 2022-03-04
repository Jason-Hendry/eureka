import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@mui/material";


export const DateField: FC<BaseFieldProps<string>> = ({label, onChange, value, id}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       onChange={(e) => onChange(e.target.value)}
                       value={value || ""}
                       type={"date"}
                       id={id}
            />
        </>
    )
}
export default DateField;

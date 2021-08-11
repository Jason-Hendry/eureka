import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";


export const SingleLineTextField: FC<BaseFieldProps<string>> = ({label, onChange, value, id}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       onChange={(e) => onChange(e.target.value)}
                       value={value || ""}
                       id={id}
            />
        </>
    )
}
export default SingleLineTextField;

import React, {FC} from "react";
import {makeStyles} from "@material-ui/styles";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";


export const EmailField: FC<BaseFieldProps<string>> = ({label, onChange, value}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                        InputProps={{type:"email"}}
                       label={label}
                       onChange={(e) => onChange(e.target.value)}
                       value={value || ""}
            />
        </>
    )
}
export default EmailField;

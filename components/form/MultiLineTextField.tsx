import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";


export const SingleLineTextField: FC<BaseFieldProps<string>> = ({label, onChange, value}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                       multiline={true}
                       label={label}
                       onChange={(e) => onChange(e.target.value)}
                       value={value || ""}
                       // InputProps={{inputComponent: TextareaAutosize}}
                       helperText={"Use 2 new lines to create a new paragraph."}
            />
        </>
    )
}
export default SingleLineTextField;

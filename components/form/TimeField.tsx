import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";


export const TimeField: FC<BaseFieldProps<string>> = ({label, onChange, value, id}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       id={id}
                       onChange={(e) => onChange(e.target.value)}
                       value={value || ""}
                       type={"time"}
            />
        </>
    )
}
export default TimeField;

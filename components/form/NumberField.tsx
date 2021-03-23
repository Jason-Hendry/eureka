import React, {FC} from "react";
import {makeStyles} from "@material-ui/styles";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";


export const NumberField: FC<BaseFieldProps<number>> = ({label, onChange, value}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       onChange={(e) => onChange(Number.parseInt(e.target.value))}
                       value={value || ""}
                       type={'number'}
            />
        </>
    )
}
export default NumberField;

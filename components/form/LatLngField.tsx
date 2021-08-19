import React, {FC} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";
import {LatLng} from "../../services/maps/getGPXPoints";

export const stringToLatLng = (str:string): LatLng => {
    console.log({str})
    const [lat,lng] = str.split(",").map((num) => Number.parseFloat(num.trim()))
    return [lat,lng || 0]
}

export const LatLngField: FC<BaseFieldProps<LatLng>> = ({label, onChange, value, id, placeholder}) => {
    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       id={id}
                       onChange={(e) => onChange(stringToLatLng(e.target.value))}
                       value={value?.join(", ") || ""}
                       type={'text'}
                       placeholder={placeholder}
                       helperText={"Use https://google.com/maps, click a location, click the lat, lng bottom center (e.g. -37.436693, 143.724264), copy the value from search field here."}

            />
        </>
    )
}
export default LatLngField;

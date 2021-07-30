import React from "react";
import {MenuItem, Select, SelectProps} from "@material-ui/core";

interface EnumSelectProps<T extends string> {
    enumSet: T[]; // Use: Object.values(EnumType)
    value: T | null
    onChange: (value: T) => void
}

export function EnumSelect<T extends string>({ onChange, enumSet, value, ...props }: (Omit<SelectProps, 'onChange'|'value'> & EnumSelectProps<T>)): JSX.Element {

    const ItemList = enumSet.map((values) => <MenuItem key={values} value={values}>{values}</MenuItem>)

    return (
        <Select
            value={value}
            {...props}
            onChange={(e) => onChange(e.target.value as T)}>
            {ItemList}
        </Select>
    )
}
export default EnumSelect;

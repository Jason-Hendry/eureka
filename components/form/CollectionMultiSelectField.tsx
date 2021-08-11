import React, {PropsWithChildren, useContext, useEffect, useState} from "react";
import {BaseFieldProps} from "./BaseField";
import {FormControl, FormLabel, MenuItem, Select} from "@material-ui/core";
import {Secret} from "../../layout/Admin/Secret";
import {CollectionAPI} from "../../services/APIService";
import {BaseList} from "../../models/base";


export function CollectionMultiSelectField<T, M extends true|false = false>({label, onChange, value, collection, getLabel, id}: PropsWithChildren<BaseFieldProps<string[]> & {collection: (secret: string) => CollectionAPI<T>, getLabel: (v: T)=>string}>): JSX.Element {

    const secret = useContext(Secret)
    const [list, setList] =useState<BaseList<T>>([])
    useEffect(() => {
        collection(secret).list().then(setList)
    },[])

    return (
        <>
            <FormControl fullWidth={true} margin={"normal"}>
                <FormLabel id={id}>{label}</FormLabel>
                <Select
                    multiple={true}
                    fullWidth={true}
                    value={value}
                    id={id}
                    onChange={(e) => onChange(e.target.value as string[])}>
                    {list.map(o => <MenuItem key={o.id} value={o.id}>{getLabel(o.data)}</MenuItem>)}
                </Select>
            </FormControl>
        </>
    )
}
export default CollectionMultiSelectField;

import React, {PropsWithChildren, useContext, useEffect, useState} from "react";
import {BaseFieldProps} from "./BaseField";
import {FormControl, FormLabel, MenuItem, Select} from "@mui/material";
import {Secret} from "../../layout/Admin/Secret";
import {BaseList, BaseModel} from "../../models/base";
import {CollectionInterface} from "../../services/CollectionInterface";


export function CollectionSelectField<T>({label, onChange, value, collection, getLabel, id}: PropsWithChildren<BaseFieldProps<string> & {collection: (secret: string) => CollectionInterface<T>, getLabel: (v: T)=>string}>): JSX.Element {
    const secret = useContext(Secret)
    const [list, setList] =useState<BaseList<T>>([])

    useEffect(() => {
        const collectionSort = (a: BaseModel<T>,b: BaseModel<T>): number => {
            if(!a || !getLabel(a.data)) return 1
            if(!b || !getLabel(b.data)) return -1
            return getLabel(a.data).localeCompare(getLabel(b.data))
        }
        collection(secret).list().then(l => l.sort(collectionSort)).then(setList)
    },[collection, secret, getLabel])


    return (
        <>
            <FormControl fullWidth={true} margin={"normal"}>
                <FormLabel id={id}>{label}</FormLabel>
                <Select
                    fullWidth={true}
                    value={value}
                    id={id}
                    onChange={(e) => onChange(e.target.value as string)}>
                    {list.map(o => <MenuItem key={o.id} value={o.id}>{getLabel(o.data)}</MenuItem>)}
                </Select>
            </FormControl>
        </>
    )
}
export default CollectionSelectField;

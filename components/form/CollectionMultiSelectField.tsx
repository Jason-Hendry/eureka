import React, {FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {FormControl, FormLabel, MenuItem, Select, Switch, TextField} from "@material-ui/core";
import EnumSelect from "../../layout/Admin/EnumSelect";
import {RaceFormat} from "../../models/Race";
import {Secret} from "../../layout/Admin/Secret";
import {CollectionAPI} from "../../services/APIService";
import {BaseList} from "../../models/base";


export function CollectionMultiSelectField<T, M extends true|false = false>({label, onChange, value, collection, getLabel}: PropsWithChildren<BaseFieldProps<string[]> & {collection: (secret: string) => CollectionAPI<T>, getLabel: (v: T)=>string}>): JSX.Element {

    const secret = useContext(Secret)
    const [list, setList] =useState<BaseList<T>>([])
    useEffect(() => {
        collection(secret).list().then(setList)
    },[])

    return (
        <>
            <FormControl fullWidth={true} margin={"normal"}>
                <FormLabel>{label}</FormLabel>
                <Select
                    multiple={true}
                    fullWidth={true}
                    value={value}
                    onChange={(e) => onChange(e.target.value as string[])}>
                    {list.map(o => <MenuItem key={o.id} value={o.id}>{getLabel(o.data)}</MenuItem>)}
                </Select>
            </FormControl>
        </>
    )
}
export default CollectionMultiSelectField;

import {useContext, useEffect, useState} from "react";
import {BaseList} from "../models/base";
import {Secret} from "../layout/Admin/Secret";
import {CollectionCache} from "../layout/Admin/CollectionCache";
import {CollectionInterface} from "../services/CollectionInterface";


export function useAdminListHooks<T>(collection: (secret: string) => CollectionInterface<T>) {
    const secret = useContext(Secret)
    const [list, setList] = useState<BaseList<T>>([])

    // const year = (new Date()).getFullYear();

    useEffect(() => {
        collection(secret).list().then(setList)
    }, [secret, collection])

    return {
        list,
        setList,
        secret
    }
}


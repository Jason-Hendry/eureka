import {CollectionAPI} from "../services/APIService";
import {useContext, useEffect, useState} from "react";
import {BaseList} from "../models/base";
import {Secret} from "../layout/Admin/Secret";


export function useAdminListHooks<T>(collection: (secret: string) => CollectionAPI<T>) {
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


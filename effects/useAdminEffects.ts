import {useContext, useEffect, useState} from "react";
import {Secret} from "../layout/Admin/Secret";
import {CollectionInterface} from "../services/CollectionInterface";

export type adminEffects<T> = {
    save: () => void
    merge: (data: Partial<T>) => void
    secret: string
    errors: string
    data: T | null
    setData: (data: T) => void
    deleteRecord: () => void
    isEdit: boolean
}

export function useAdminEffects<T>(collection: (secret: string) => CollectionInterface<T>, blank: () => T, afterDelete?: () => void): adminEffects<T> {
    const secret = useContext(Secret)
    const [data, setData] = useState<T | null>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [errors, setErrors] = useState<string>("")

    useEffect(() => {
        const hash = document.location.hash.replace(/^#/, '')
        if (hash.length) {
            console.log(`Loading ${hash}`)
            collection(secret).get(hash).then(r => setData(r.data))
            setIsEdit(true)
        } else {
            setData(blank())
        }
    }, [secret])

    const documentId = () => document.location.hash.substr(1, 9999)

    return {
        save: () => {
            if (document.location.hash.length && data) {
                collection(secret).put(data, documentId()).then(r => setData(r.data)).catch(setErrors)
            } else if (data) {
                collection(secret).post(data).then(r => {
                    document.location.hash = '#' + r.id
                    setData(r.data)
                    setIsEdit(true)
                }).catch(setErrors)
            }
        },
        deleteRecord: () => {
            if (data) {
                collection(secret).delete(data, documentId()).then(afterDelete).catch(setErrors)
            }
        },
        merge: (newData) => {
            const newModel = data || blank()
            setData({...newModel, ...newData})
        },
        secret,
        data,
        setData,
        isEdit,
        errors
    }
}
import {CollectionAPI, CoursesCollectionApi, RaceCollectionApi} from "../services/APIService";
import {useContext, useEffect, useState} from "react";
import {BaseList, BaseModel} from "../models/base";
import {Secret} from "../layout/Admin/Secret";
import {CourseData} from "../models/Course";
import {Credentials} from "aws-sdk/clients/sts";
import {AWSService, s3} from "../services/AWS";
import {Body} from "aws-sdk/clients/s3";

export function loadApiEffectAndSave<T>(collection: (secret: string) => CollectionAPI<T>, secret: string, data: T, setState: (value: T) => void, blank: () => T): () => void {
    useEffect(() => {
        if (document.location.hash.length) {
            collection(secret).get(document.location.hash.substr(1, 999)).then(r => setState(r.data))
        } else {
            setState(blank())
        }
    }, [secret])


    return () => {
        if (document.location.hash.length && data) {
            collection(secret).put(data, document.location.hash.substr(1, 9999)).then(r => setState(r.data))
        } else if (data) {
            collection(secret).post(data).then(r => {
                document.location.hash = '#' + r.id
                setState(r.data)
            })
        }
    }
}

type adminEffects<T> = {
    save: () => void
    merge: (data: Partial<T>) => void
    secret: string
    data: T | null
    setData: (data: T) => void
    isEdit: boolean
}

export function useAdminEffects<T>(collection: (secret: string) => CollectionAPI<T>, blank: () => T): adminEffects<T> {
    const secret = useContext(Secret)
    const [data, setData] = useState<T | null>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    useEffect(() => {
        const hash = document.location.hash.replace(/^#/,'')
        if (hash.length) {
            console.log(`Loading ${hash}`)
            collection(secret).get(hash).then(r => setData(r.data))
            setIsEdit(true)
        } else {
            setData(blank())
        }
    }, [secret])


    return {
        save: () => {
            if (document.location.hash.length && data) {
                collection(secret).put(data, document.location.hash.substr(1, 9999)).then(r => setData(r.data))
            } else if (data) {
                collection(secret).post(data).then(r => {
                    document.location.hash = '#' + r.id
                    setData(r.data)
                    setIsEdit(true)
                })
            }
        },
        merge: (newData) => {
            const newModel = data || blank()
            setData({...newModel, ...newData})
        },
        secret,
        data,
        setData,
        isEdit
    }
}

type adminListHooks<T> = {
    list: T | null
    setList: (data: T) => void
    secret: string
}
export function useAdminListHooks<T>(collection: (secret: string) => CollectionAPI<T>) {
    const secret = useContext(Secret)
    const [list, setList] = useState<BaseList<T>>([])

    const year = (new Date()).getFullYear();

    useEffect(() => {
        collection(secret).list().then(setList)
    }, [secret])

    return {
        list,
        setList,
        secret
    }
}


type s3UploadReturn = {
    s3Upload: (body: Body, key: string, bucket: string) => Promise<{filename: string}>
    uploading?: boolean
}
export function useS3Upload(): s3UploadReturn {
    const secret = useContext(Secret)
    const [awsCredentials, setAwsCredentials] = useState<Credentials|null>()
    const [uploading, setUploading] = useState<boolean>()
    useEffect(() => {
        AWSService(secret).then((c) => {
            console.log(c)
            setAwsCredentials(c)
        })
    }, [secret])

    const s3Upload = (body: Body, key: string, bucket: string): Promise<{filename: string}> => {
        return new Promise<{filename: string}>((resolve, reject) => {
            if(awsCredentials && bucket) {
                setUploading(true)
                console.log(`Uploadings s3://${bucket}/${key} ${awsCredentials?.AccessKeyId}`)
                const req = s3(awsCredentials).putObject({
                    Body: body,
                    Key: key,
                    Bucket: bucket,
                    ACL: "public-read",
                    ContentDisposition: "inline"
                }, (e, out) => {
                    setUploading(false)
                    console.log(`Uploaded https://images.eurekacycling.org.au/${key}`)
                    if(e) {
                        reject(e)
                    }
                    resolve({filename: `https://images.eurekacycling.org.au/${key}`})
                })
            }
        })
    }

    return {
        s3Upload,
        uploading
    }

}

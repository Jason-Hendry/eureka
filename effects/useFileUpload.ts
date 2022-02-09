import {useState} from "react";
import {FileStorage, PutFile, StorageConfig} from "../services/FileStorage/FileStorage";

type FileUploadReturn = {
    FileUpload: (file: PutFile) => Promise<{ filename: string }>
    uploading?: boolean
}

export function useFileUpload(FileStorageConfig: StorageConfig|null): FileUploadReturn {
    const [isUploading, setIsUploading] = useState<boolean>()
    const fileStorage = FileStorageConfig ? FileStorage.Create(FileStorageConfig) : null

    console.log(fileStorage)
    const FileUpload = (file: PutFile): Promise<{ filename: string }> => {
        if(fileStorage === null) {
            throw new FileStorageUnavailableException()
        }
        setIsUploading(true)
        return fileStorage.PutFile(file).then((r) => {
            setIsUploading(false)
            return r
        }).catch(e => {
            setIsUploading(false)
            throw e
        })
    }

    return {
        FileUpload,
        uploading: isUploading
    }

}

export class FileStorageUnavailableException extends Error {}
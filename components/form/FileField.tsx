import React, {FC, RefObject, useRef, useState} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";
import {useFileUpload} from "../../effects/useFileUpload";
import {useS3StorageConfiguration} from "../../effects/useS3StorageConfiguration";
import {useSecret} from "../../effects/useSecret";
import {PutFile} from "../../services/FileStorage/FileStorage";

export const processFirstFile = (fileRef: RefObject<HTMLInputElement>): Promise<PutFile> | undefined => {
    if (!fileRef.current?.files?.length) {
        return
    }
    const file = fileRef.current?.files?.item(0)
    if (!file) {
        return
    }
    return file.arrayBuffer().then(data => {
        if (data.byteLength == 0) {
            throw new EmptyFileException()
        }
        return data
    }).then(arrayBuf => {
        return {
            filepath: file.name,
            body: new Uint8Array(arrayBuf)
        }
    })

}

export const FileField: FC<BaseFieldProps<string>> = ({label, onChange, value, id}) => {
    const s3 = useS3StorageConfiguration(useSecret(), "images.eurekacycling.org.au")
    const {FileUpload, uploading} = useFileUpload(s3)
    const [fileError, setFileError] = useState<string | undefined>(undefined)

    const fileRef = useRef<HTMLInputElement>(null)
    const handleFile = () => {
        processFirstFile(fileRef)?.then(FileUpload)
            .then(f => onChange(f.filename))
            .catch(console.warn)
    }

    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       id={id}
                       inputRef={fileRef}
                       type={'file'}
                       error={fileError !== undefined}
                       helperText={(uploading ? "...uploading" : value ? value : "") + "\n" + fileError}
                       onChange={handleFile}
            />
        </>
    )
}
export default FileField;


export class EmptyFileException extends Error {
}
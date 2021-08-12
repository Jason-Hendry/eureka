import React, {FC, useRef} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";
import {useS3Upload} from "../../effects/useS3Upload";


export const FileField: FC<BaseFieldProps<string>> = ({label, onChange, value, id}) => {

    const {s3Upload, uploading} = useS3Upload()

    const fileRef = useRef<HTMLInputElement>()
    const handleFile = () => {
        if (!fileRef.current?.files?.length) {
            return;
        }
        const file = fileRef.current?.files?.item(0)
        if (!file) {
            return;
        }

        const key = file.name
        const bucket = 'images.eurekacycling.org.au';
        s3Upload(file, key, bucket).then(f => onChange(f.filename))
    }

    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       id={id}
                       inputRef={fileRef}
                       inputProps={{type: 'file'}}
                       helperText={uploading ? "...uploading" : value ? value : ""}
                       onChange={handleFile}
            />
        </>
    )
}
export default FileField;

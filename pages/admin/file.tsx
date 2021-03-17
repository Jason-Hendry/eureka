import React, {FC, useRef} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    TextField, Theme,
    Typography, withTheme
} from "@material-ui/core";
import { FilesCollectionApi} from "../../services/APIService";
import { useAdminEffects, useS3Upload} from "../../effects/loadApiEffect";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {FileData} from "../../models/File";
import AdminLoading from "../../layout/Admin/AdminLoading";

type RaceProps = {
    theme: Theme;
}

const BlankFile = (): FileData => ({filename: "", alt: ""})

const AdminIndex: FC<RaceProps> = ({theme}) => {
    const {save, merge, data: file, isEdit} = useAdminEffects(FilesCollectionApi, BlankFile)
    const {s3Upload, uploading} = useS3Upload()

    const fileRef = useRef<HTMLInputElement>()

    if (!file) return <AdminLoading/>

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
        s3Upload(file, key, bucket).then(merge)
    }

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{isEdit ? 'Edit' : 'Create New '} File</Typography>

            <form onSubmit={e => e.preventDefault()}>
                <TextField {...defaultFieldProps}
                           InputProps={{type: 'file'}}
                           inputRef={fileRef}
                           label={'Title'}
                           onChange={handleFile}
                />
                {uploading ? <span>Uploading...</span> : <span>&nbsp;</span>}



                <FormControl fullWidth={true} margin={"normal"}>
                    <Button disabled={!file.filename || uploading} type={"submit"} variant={"contained"}
                            color={"primary"}
                            onClick={save}>{isEdit ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>
}

export default withTheme(AdminIndex)

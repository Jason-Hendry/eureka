import React, {FC, useEffect, useRef, useState} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    TextField, Theme,
    Typography, withTheme
} from "@material-ui/core";
import { ImagesCollectionApi} from "../../services/APIService";
import {makeStyles} from "@material-ui/styles";
import {useAdminEffects, useS3Upload} from "../../effects/loadApiEffect";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import AdminLoading from "../../layout/Admin/AdminLoading";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import {ImageData} from "../../models/Image";
import picaF from 'pica';
const pica = picaF()


type RaceProps = {
    theme: Theme;
}

const useStyles = (theme: Theme) => makeStyles({
    root: {
        padding: theme.spacing(4)
    },
    hideImage: {
        display: 'none'
    },
    dropImages: {
        border: `2px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(2)
    }
})

function BlankImage(): ImageData {
    return {
        alt: "",
        filename: "",
        hero: "",
        admin: "",
        poster: ""
    }
}

const AdminImage:FC<RaceProps> = ({theme}) => {
    const bucket = process.env.AWS_S3_BUCKET || "images.eurekacycling.org.au"; // No getting env?

    const {save, merge, data: image, isEdit} = useAdminEffects<ImageData>(ImagesCollectionApi, BlankImage)
    const {s3Upload, uploading} = useS3Upload()
    const fileRef = useRef<HTMLInputElement>()
    const imgRef = useRef<HTMLImageElement>(null)
    const canvas = useRef<HTMLCanvasElement>(null)
    const heroCanvas = useRef<HTMLCanvasElement>(null)
    const posterCanvas = useRef<HTMLCanvasElement>(null)
    const adminCanvas = useRef<HTMLCanvasElement>(null)
    const [src, setSrc] = useState<string|undefined>(undefined)
    const [filename, setFilename] = useState<string|undefined>(undefined)
    const classes = useStyles(theme)()

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.onload = () => {
                if(!canvas.current||!heroCanvas.current||!posterCanvas.current||!adminCanvas.current||!imgRef.current) {
                    return
                }
                const canvasContext = canvas.current.getContext("2d")
                if(!canvasContext) return;
                canvasContext.drawImage(imgRef.current, 0, 0)

                pica.resize(canvas.current, heroCanvas.current).then(() => {
                    if(!heroCanvas.current) return
                    pica.toBlob(heroCanvas.current, 'image/jpeg').then((b) => {
                        s3Upload(b, filename+'-hero.jpg', bucket).then(f => merge({hero: f.filename}))
                    });
                    if(!canvas.current||!posterCanvas.current) return
                    pica.resize(canvas.current, posterCanvas.current).then(() => {
                        if(!posterCanvas.current) return

                        pica.toBlob(posterCanvas.current, 'image/jpeg').then((b) => {
                            s3Upload(b, filename+'-poster.jpg', bucket).then(f => merge({poster: f.filename}))
                            // setPosterBlob((b))
                        });

                        if(!canvas.current||!adminCanvas.current) return
                        pica.resize(canvas.current, adminCanvas.current).then(() => {
                            if(!adminCanvas.current) return

                            pica.toBlob(adminCanvas.current, 'image/jpeg').then((b) => {
                                s3Upload(b, filename+'-admin.jpg', bucket).then(f => merge({admin: f.filename}))
                                // setAdminBlob((b))
                            });
                        })

                    })

                })
            }
        }
    }, [imgRef, canvas])

    if(!image) return <AdminLoading />

    const handleFile = () => {
        if (!fileRef.current?.files?.length) {
            return;
        }
        const file = fileRef.current?.files?.item(0)
        if (!file) {
            return;
        }

        setFilename(file.name)
        setSrc(URL.createObjectURL(file))
        s3Upload(file, file.name, bucket).then(merge)

    }

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{isEdit ? 'Edit' : 'Create New '} Image</Typography>

            <form onSubmit={e => e.preventDefault()}>

                <TextField {...defaultFieldProps}
                           InputProps={{type: 'file'}}
                           inputRef={fileRef}
                           label={'Title'}
                           onChange={handleFile}
                />
                {uploading ? <span>Uploading...</span> : <span>&nbsp;</span>}
                <canvas className={classes.hideImage} ref={canvas} width={1500} height={750}/>
                <canvas className={classes.hideImage} ref={heroCanvas} width={1500} height={750}/>
                <canvas className={classes.hideImage} ref={posterCanvas} width={600} height={400}/>
                <canvas ref={adminCanvas} width={200} height={130}/>
                <img className={classes.hideImage} alt="Admin image loader" ref={imgRef} src={src}/>

                <ul>
                    {image.filename ? <li><a href={image.filename} >{image.filename}</a></li> : null}
                    {image.hero ? <li><a href={image.hero} >{image.hero}</a></li> : null}
                    {image.poster ? <li><a href={image.poster} >{image.poster}</a></li> : null}
                    {image.admin ? <li><a href={image.admin} >{image.admin}</a></li> : null}
                </ul>


                <SingleLineTextField label={'Alt Text / Descriptions'} onChange={(e) => merge({alt: e})} value={image.alt}/>

                <FormControl fullWidth={true} margin={"normal"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"} onClick={save}>{isEdit ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>

}

export default withTheme(AdminImage)

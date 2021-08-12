import React, {FC, useEffect, useRef, useState} from "react";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";
import picaF from 'pica';
import {useS3Upload} from "../../effects/useS3Upload";
const pica = picaF()


interface ImageSize {
    width: number
    height: number
}

export const HeroSize:ImageSize = {width: 1500, height: 750}
// export const PosterSize:ImageSize = {width: 600, height: 400}

export const ImageField: FC<BaseFieldProps<string> & ImageSize> = ({label, onChange, value, width, height, id}) => {
    const bucket = process.env.AWS_S3_BUCKET || "images.eurekacycling.org.au"; // No getting env?

    const {s3Upload, uploading} = useS3Upload()
    const [src, setSrc] = useState<string|undefined>(undefined)
    const [filename, setFilename] = useState<string|undefined>(undefined)
    const imgRef = useRef<HTMLImageElement>(null)
    const fromCanvas = useRef<HTMLCanvasElement>(null)
    const toCanvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.onload = () => {
                if(!fromCanvas.current||!toCanvas.current||!imgRef.current) {
                    return
                }
                console.log('Loading')
                fromCanvas.current.width = imgRef.current.width
                fromCanvas.current.height = imgRef.current.height
                const canvasContext = fromCanvas.current.getContext("2d")
                if(!canvasContext) return;
                canvasContext.drawImage(imgRef.current, 0, 0)
                pica.resize(fromCanvas.current, toCanvas.current).then(() => {
                    if(!toCanvas.current) return
                    console.log('Resizing')
                    pica.toBlob(toCanvas.current, 'image/jpeg').then((b) => {
                        console.log('Uploading')
                        s3Upload(b, filename+'-hero.jpg', bucket).then(f => {
                            console.log(`Uploaded: ${f.filename}`)
                            onChange(f.filename)
                        })
                    });
                })
            }
        }
    }, [imgRef, bucket, filename, onChange, s3Upload])

    const fileRef = useRef<HTMLInputElement>()
    const handleFile = () => {
        if (!fileRef.current?.files?.length) {
            return;
        }
        const file = fileRef.current?.files?.item(0)
        if (!file) {
            return;
        }

        // const key = file.name
        // const bucket = 'images.eurekacycling.org.au';
        setFilename(file.name)
        setSrc(URL.createObjectURL(file))
    }

    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       id={id}
                       inputRef={fileRef}
                       inputProps={{type: 'file'}}
                       helperText={uploading ? "...uploading" : value || ''}
                       onChange={handleFile}
            />
            <img alt="Admin image loader" ref={imgRef} src={src} style={{ display:"none" }} />
            <canvas ref={fromCanvas} style={{ display:"none" }} />
            <canvas ref={toCanvas} width={width} height={height} style={{ transform: 'scale(.5)', transformOrigin: '0 0' }} />
        </>
    )
}
export default ImageField;

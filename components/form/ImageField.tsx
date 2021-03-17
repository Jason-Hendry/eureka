import React, {FC, useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {BaseFieldProps} from "./BaseField";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {TextField} from "@material-ui/core";
import {useS3Upload} from "../../effects/loadApiEffect";
import AdminLoading from "../../layout/Admin/AdminLoading";
import picaF from 'pica';
const pica = picaF()


interface ImageSize {
    width: number
    height: number
}

export const HeroSize:ImageSize = {width: 1500, height: 750}
export const PosterSize:ImageSize = {width: 600, height: 400}

export const ImageField: FC<BaseFieldProps<string> & ImageSize> = ({label, onChange, value, width, height}) => {
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
                fromCanvas.current.width = imgRef.current.width
                fromCanvas.current.height = imgRef.current.height
                const canvasContext = fromCanvas.current.getContext("2d")
                if(!canvasContext) return;
                canvasContext.drawImage(imgRef.current, 0, 0)

                pica.resize(fromCanvas.current, toCanvas.current).then(() => {
                    if(!toCanvas.current) return
                    pica.toBlob(toCanvas.current, 'image/jpeg').then((b) => {
                        s3Upload(b, filename+'-hero.jpg', bucket).then(f => onChange(f.filename))
                    });
                })
            }
        }
    }, [imgRef])

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
        setFilename(file.name)
        setSrc(URL.createObjectURL(file))
    }

    return (
        <>
            <TextField {...defaultFieldProps}
                       label={label}
                       inputRef={fileRef}
                       inputProps={{type: 'file'}}
                       helperText={uploading ? "...uploading" : ""}
                       onChange={handleFile}
                       value={value || ""}
            />
            <img alt="Admin image loader" ref={imgRef} src={src}/>
            <canvas ref={fromCanvas}/>
            <canvas ref={toCanvas} width={width} height={height}/>
        </>
    )
}
export default ImageField;

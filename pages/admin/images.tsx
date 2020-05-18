import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import {Button, Paper, Typography} from "@material-ui/core";
import {useDropzone} from "react-dropzone";
import {makeStyles} from "@material-ui/styles";
import Pica from 'pica';
const pica = Pica();


const useStyles = makeStyles((theme) => ({
    root: {
        padding: 16
    },
    hideImage: {
        display: 'none'
    }
}))

export default function Images(props) {

    const classes = useStyles()

    const canvas = useRef(null)
    const heroCanvas = useRef(null)
    const posterCanvas = useRef(null)
    const adminCanvas = useRef(null)
    const img = useRef(null)

    const [heroBlob, setHeroBlob] = useState(null)
    const [posterBlob, setPosterBlob] = useState(null)
    const [adminBlob, setAdminBlob] = useState(null)


    const [src , setSrc] = useState(null)

    useEffect(() => {
        img.current.onload = () => {
            const canvasContext = canvas.current.getContext("2d")
            canvasContext.drawImage(img.current, 0, 0)

            pica.resize(canvas.current, heroCanvas.current).then(() => {
                pica.toBlob(heroCanvas.current, 'image/jpeg').then(b => {
                    setHeroBlob((b))
                });
            })
            pica.resize(canvas.current, posterCanvas.current).then(() => {
                pica.toBlob(posterCanvas.current, 'image/jpeg').then(b => {
                    setPosterBlob((b))
                });
            })
            pica.resize(canvas.current, adminCanvas.current).then(() => {
                pica.toBlob(adminCanvas.current, 'image/jpeg').then(b => {
                    setAdminBlob((b))
                });
            })
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            // console.log(file)
            // img.current.file = file
            setSrc(URL.createObjectURL(file))
        })

        // acceptedFiles.forEach((file) => {
        //
        //     console.log(file)
        //
        //     const reader = new FileReader()
        //
        //     reader.onabort = () => console.log('file reading was aborted')
        //     reader.onerror = () => console.log('file reading has failed')
        //     reader.onload = () => {
        //         // Do whatever you want with the file contents
        //         // const binaryStr = reader.readAsArrayBuffer()
        //         // canvas.current
        //         // console.log(binaryStr)
        //
        //         var data = reader.result;
        //         // @ts-ignore
        //         var array = new Int8Array(data);
        //
        //         const blob = new Blob(array, {type : file.type});
        //         createImageBitmap(blob).then(img => {
        //             console.log(img)
        //             const canvasContext = canvas.current.getContext("2d")
        //             canvasContext.drawImage(img, 0, 0)
        //         })
        //
        //     }
        //     reader.readAsArrayBuffer(file)
        // })

    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <Paper>

                <p>Hero Resized: {heroBlob?.size}bytes</p>
                <p>Poster Resized: {posterBlob?.size}bytes</p>
                <p>Admin Resized: {adminBlob?.size}bytes</p>

                <Button>Upload</Button>

            <Typography variant={"h6"}>Images</Typography>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>

            <canvas ref={canvas} width={'800'} height={'500'} />
            <canvas className={classes.hideImage} ref={heroCanvas} width={1500} height={750} />
            <canvas className={classes.hideImage} ref={posterCanvas} width={600} height={400} />
            <canvas className={classes.hideImage} ref={adminCanvas} width={200} height={130} />
            <img className={classes.hideImage} ref={img} src={src}/>
            </Paper>
        </div>
    )

}
export async function getStaticProps(props) {
    return {props}
}


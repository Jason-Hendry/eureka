import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import {Button, Paper, TextField, Theme, Typography} from "@material-ui/core";
import {useDropzone} from "react-dropzone";
import {makeStyles} from "@material-ui/styles";
import Pica from 'pica';
import {AWSCredentials as AWSCredContext, Secret} from "../../components/AdminTheme/Secret";
import {AWSCredentials} from "../../services/Login";
import {DocPostImages} from "../../services/APIService";
import {ConfigBase} from "aws-sdk/lib/config";

const pica = Pica();


const AWS = require("aws-sdk");

const useStyles = makeStyles((theme: Theme) => ({
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
}))

export default function Images(props) {
    const bucket = process.env.AWS_S3_BUCKET || "images.eurekacycling.org.au"; // No getting env?

    const classes = useStyles()

    const canvas = useRef(null)
    const heroCanvas = useRef(null)
    const posterCanvas = useRef(null)
    const adminCanvas = useRef(null)
    const img = useRef(null)

    const [filename, setFilename] = useState("")
    const [altText, setAltText] = useState("")
    const [heroBlob, setHeroBlob] = useState(null)
    const [posterBlob, setPosterBlob] = useState(null)
    const [adminBlob, setAdminBlob] = useState(null)

    const awsCredentials = useContext(AWSCredContext)
    const secret = useContext(Secret)

    const [src, setSrc] = useState(null)

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

    const upload = () => {
        uploadFile(awsCredentials, filename+'-hero.jpg', heroBlob)
        uploadFile(awsCredentials, filename+'-poster.jpg', posterBlob)
        uploadFile(awsCredentials, filename+'-admin.jpg', adminBlob)
        DocPostImages({
            filename: filename,
            hero: `https://${bucket}/${filename}-hero.jpg`,
            admin: `https://${bucket}/${filename}-admin.jpg`,
            poster: `https://${bucket}/${filename}-poster.jpg`,
            alt: altText
        }, secret)
    }
    const uploadFile = (credential: AWSCredentials, key: string, data: Blob) => {
        console.log(`Uploading https://${bucket}/${key}`)
        const s3 = new AWS.S3({region:"ap-southeast-2", credentials: new AWS.Credentials(credential.AccessKeyId, credential.SecretAccessKey, credential.SessionToken)});
        const req = s3.putObject({
            Body: data,
            Key: key,
            Bucket: bucket,
            ACL: "public-read",
            ContentDisposition: "inline"
        }, (e, out) => {
            console.log("Error", e)
            console.log("Out", out)
        })
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            // console.log(file)
            // img.current.file = file
            // console.log(file.path)
            setFilename(file.path)
            setSrc(URL.createObjectURL(file))
        })

    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div>
            <Paper className={classes.root}>

                <p>Hero Resized: {heroBlob?.size}bytes</p>
                <p>Poster Resized: {posterBlob?.size}bytes</p>
                <p>Admin Resized: {adminBlob?.size}bytes</p>

                <TextField fullWidth={true} value={filename} label={'Filename'} onChange={e => setFilename(e.target.value)} />
                <TextField fullWidth={true} value={altText} label={'Alt Text'} onChange={e => setAltText(e.target.value)} />

                <Button onClick={upload}>Upload</Button>

                <Typography variant={"h6"}>Images</Typography>
                <div {...getRootProps()} className={classes.dropImages}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop 1 file here, or click to select files</p>
                </div>
                <canvas ref={canvas} width={1500} height={750}/>
                <canvas className={classes.hideImage} ref={heroCanvas} width={1500} height={750}/>
                <canvas className={classes.hideImage} ref={posterCanvas} width={600} height={400}/>
                <canvas className={classes.hideImage} ref={adminCanvas} width={200} height={130}/>
                <img className={classes.hideImage} ref={img} src={src}/>
            </Paper>
        </div>
    )

}

export async function getStaticProps(props) {
    return {props: {}}
}


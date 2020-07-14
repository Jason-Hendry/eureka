import {Button, Drawer, Theme} from "@material-ui/core";
import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import useSWR from "swr";
import {Image, ImageList} from "../models/Image";
import {ImageListFetcher} from "../services/APIService";
import {Secret} from "./AdminTheme/Secret";

const useStyles = makeStyles((theme: Theme) => ({
    selectImage: {
        margin: theme.spacing(1),
        // marginLeft: theme.spacing(2)
    },
    selectImageButton: {marginTop: theme.spacing(2)}
}))

interface ImageSelectorProps {
    addImage: (image: Image) => void
}

export const ImageSelector = ({addImage}: ImageSelectorProps) => {
    const classes = useStyles();

    const secret = useContext(Secret);

    const imageListSWR = useSWR<ImageList>(`/api/Images?secret=${secret}`, ImageListFetcher)
    const imageList = imageListSWR?.data

    const [showImages, setShowImages] = useState<boolean>(false);

    const [skip, setSkip] = useState<number[]>([])

    const imageError = (k) => {

        setSkip([...skip, k])
    }

    return <React.Fragment>
        <Button className={classes.selectImageButton} variant={"outlined"} onClick={e => setShowImages(!showImages)}>Select
            Images</Button>
        <Drawer anchor={"right"} open={showImages} onClose={() => setShowImages(false)}>
            {imageList ? imageList.map((i, k) => skip.indexOf(k) === -1 ? <img onError={() => imageError(k)} onClick={() => addImage(i)} className={classes.selectImage} key={k}
                                                      src={i.data.admin}/> : null)  : null}
        </Drawer>
    </React.Fragment>
}

import {Button, Drawer, Theme, withTheme} from "@material-ui/core";
import React, {FC, useContext, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {Image} from "../../models/Image";
import {Secret} from "./Secret";

const useStyles = (theme: Theme) => makeStyles({
    selectImage: {
        margin: theme.spacing(1),
        // marginLeft: theme.spacing(2)
    },
    selectImageButton: {marginTop: theme.spacing(2)}
})

interface ImageSelectorProps {
    addImage: (image: Image) => void
    theme: Theme
}

const ImageSelector: FC<ImageSelectorProps> = ({addImage, theme}: ImageSelectorProps) => {
    const classes = useStyles(theme)();

    const secret = useContext(Secret);

    // const imageListSWR = useSWR<ImageList>(`/api/Images?secret=${secret}`, ImageListFetcher)
    // const imageList = imageListSWR?.data

    const [showImages, setShowImages] = useState<boolean>(false);
    const [skip, setSkip] = useState<number[]>([])

    const imageError = (k: number) => {
        setSkip([...skip, k])
    }

    return <React.Fragment>
        <Button className={classes.selectImageButton} variant={"outlined"} onClick={e => setShowImages(!showImages)}>Select
            Images</Button>
        {/*<Drawer anchor={"right"} open={showImages} onClose={() => setShowImages(false)}>*/}
        {/*    {imageList ? imageList.map((i, k) => skip.indexOf(k) === -1 ? <img onError={() => imageError(k)} onClick={() => addImage(i)} className={classes.selectImage} key={k}*/}
        {/*                                              src={i.data.admin}/> : null)  : null}*/}
        {/*</Drawer>*/}
    </React.Fragment>
}
export default withTheme(ImageSelector)

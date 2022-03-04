import {FC} from "react";
import {Grid} from "@mui/material";


interface ThreeProps {

}

const Columns: FC<ThreeProps> = ({children}) => {
    return (
        <div>
            <Grid container spacing={2}>
                {children}
            </Grid>
        </div>
    )
}

interface ThirdProps {

}

export const Third: FC<ThirdProps> = ({children}) => {
    return (
        <Grid item xs={12} sm={12} md={4}>
            {children}
        </Grid>
    );
}

interface HalfProps {
    align?: 'left'|'right'
}

export const Half: FC<HalfProps> = ({children, align = 'left'}) => {
    return (
        <Grid item xs={12} sm={12} md={6} style={{textAlign:align}}>
            {children}
        </Grid>
    );
}

export default Columns;

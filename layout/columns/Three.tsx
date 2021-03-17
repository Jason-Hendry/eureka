import {FC} from "react";
import {Grid} from "@material-ui/core";


interface ThreeProps {

}

const Three: FC<ThreeProps> = ({children}) => {
    return (
        <div>
            <Grid container spacing={2}>
                {children}
            </Grid>
        </div>
    )
}

interface ColumnThirdProps {

}

export const ColumnThird: FC<ColumnThirdProps> = ({children}) => {
    return (
        <Grid item xs={12} sm={12} md={4}>
            {children}
        </Grid>
    );
}

export default Three;

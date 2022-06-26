import React, {FC, ReactNode} from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
// @mui/material components
import {makeStyles, createStyles, useTheme} from "@mui/styles";
import {Theme, Typography} from "@mui/material";

const useStyles = makeStyles(({spacing, typography}: Theme) => createStyles({
  infoArea: {
    textAlign: 'left',
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    fontFamily: typography.h2.fontFamily
  }
}));

interface InfoAreaProps {
  icon: ReactNode,
  title: string,
  description: string,
  // iconColor: "primary",
                             //   "warning",
                             //   "danger",
                             //   "success",
                             //   "info",
                             //   "rose",
                             //   "gray"
                             // ]),
  vertical?: boolean
}

export const InfoArea: FC<InfoAreaProps> = (props) => {
  const { title, icon } = props;
  const classes = useStyles();

  return (
    <div className={classes.infoArea}>
        <Typography variant={'h2'}>{title}</Typography>
    </div>
  );
}
export default InfoArea;

import React, {FC, ReactNode} from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
// @mui/material components
import { makeStyles, createStyles } from "@mui/styles";
import {Theme, Typography} from "@mui/material";

const useStyles = makeStyles(({spacing}: Theme) => createStyles({
  infoArea: {
    textAlign: 'center',
    paddingTop: spacing(4),
    paddingBottom: spacing(6)
  }
}));

interface InfoAreaProps {
  theme: Theme,
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

  const Icon = icon;

  return (
    <div className={classes.infoArea}>
        {icon}
        <Typography variant={'h5'} component={'h2'}>{title}</Typography>
    </div>
  );
}
export default InfoArea;

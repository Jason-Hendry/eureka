import React, {Component, FC, ReactNode} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {createStyles, Theme, Typography, withTheme} from "@material-ui/core";

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
  const { title, description, vertical,theme, icon } = props;
  const classes = useStyles();

  const Icon = icon;

  return (
    <div className={classes.infoArea}>
        {icon}
        <Typography variant={'h5'} component={'h2'}>{title}</Typography>
    </div>
  );
}
export default withTheme(InfoArea);

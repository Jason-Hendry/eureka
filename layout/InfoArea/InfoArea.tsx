import React, {Component, FC, ReactNode} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Theme, withTheme} from "@material-ui/core";

const useStyles = ({palette}: Theme) => makeStyles({
  primary:{
    color: palette.primary.main
  },
  iconWrapper:{
    float: "left",
    marginTop: "24px",
    marginRight: "10px"
  },
  iconWrapperVertical:{
    float: "none"
  },
  icon:{
    width: "36px",
    height: "36px"
  },
  iconVertical:{
    width: "61px",
    height: "61px"
  },
  infoArea:{
    maxWidth: "360px",
    margin: "0 auto",
    padding: "0px"
  },
  descriptionWrapper:{
    color: palette.grey.A100,
    overflow: "hidden"
  },
  title:{
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: 700,
    fontFamily: `"Roboto Slab", "Times New Roman", serif`
  },
  description:{
    color: palette.grey.A100,
    overflow: "hidden",
    marginTop: "0px",
    fontSize: "14px"
  },
});

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
  const classes = useStyles(theme)();
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    // [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical
  });

  const Icon = icon;

  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper}>
        {icon}
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}
export default withTheme(InfoArea);

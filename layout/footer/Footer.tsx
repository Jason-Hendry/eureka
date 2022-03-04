import React, {VFC} from "react";
import {List, Theme} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {container} from "../container/container";

// @mui/icons-material

const useStyles = makeStyles(({palette}: Theme) => ({
  footer: {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: 2,
    position: "relative"
  },
  a: {
    color: palette.primary.main,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  container,
  left: {
    float: "left",
    display: "block"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
}));


export const Footer: VFC = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>

          </List>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

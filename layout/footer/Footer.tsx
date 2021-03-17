import React, {FC} from "react";
import {List, ListItem, Theme, withTheme} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {container} from "../container/container";

// @material-ui/icons

const useStyles = ({palette}: Theme) => makeStyles({
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
});


interface FooterProps {
  theme: Theme
}

export const Footer: FC<FooterProps> = ({theme}) => {
  const classes = useStyles(theme)();
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
export default withTheme(Footer);

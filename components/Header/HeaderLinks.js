/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import MapIcon from '@material-ui/icons/Map';
import EventIcon from '@material-ui/icons/Event';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AnnouncementIcon from '@material-ui/icons/Announcement';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";
import Button from "../../components/CustomButtons/Button";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>

        <ListItem className={classes.listItem}>
            <Button
                href={"/news"}
                color="transparent"
                className={classes.navLink}
            >
                <AnnouncementIcon className={classes.icons} /> News
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                href={"/races"}
                color="transparent"
                className={classes.navLink}
            >
                <EventIcon className={classes.icons} /> Calendar
            </Button>
        </ListItem>
        {/*<ListItem className={classes.listItem}>*/}
        {/*    <Button*/}
        {/*        href={"/races"}*/}
        {/*        color="transparent"*/}
        {/*        className={classes.navLink}*/}
        {/*    >*/}
        {/*        <DirectionsBikeIcon className={classes.icons} /> Results*/}
        {/*    </Button>*/}
        {/*</ListItem>*/}
        {/*<ListItem className={classes.listItem}>*/}
        {/*    <Button*/}
        {/*        href={"/races"}*/}
        {/*        color="transparent"*/}
        {/*        target="_blank"*/}
        {/*        className={classes.navLink}*/}
        {/*    >*/}
        {/*        <MapIcon className={classes.icons} /> Circuits*/}
        {/*    </Button>*/}
        {/*</ListItem>*/}

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Find us on facebook"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href={"https://www.facebook.com/EurekaVeteransCyclingClub/"}
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

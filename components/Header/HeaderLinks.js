/*eslint-disable*/
import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import EventIcon from '@material-ui/icons/Event';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";
import Link from "next/link";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
    const classes = useStyles();
    return (
        <List className={classes.list}>

            <ListItem className={classes.listItem}>
                <Link
                    href={"/news"}

                >
                    <a className={classes.navLink}><AnnouncementIcon className={classes.icons}/> News</a>
                </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Link
                    href={"/races"}
                >
                    <a className={classes.navLink}
                    ><EventIcon className={classes.icons}/> Calendar</a>
                </Link>
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
                    classes={{tooltip: classes.tooltip}}
                >
                    <a
                        color="transparent"
                        href={"https://www.facebook.com/EurekaVeteransCyclingClub/"}
                        target="_blank"
                        className={classes.navLink}
                    >
                        <i className={classes.socialIcons + " fab fa-facebook"}/>
                    </a>
                </Tooltip>
            </ListItem>
        </List>
    );
}

/*eslint-disable*/
import React, {FC} from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import EventIcon from '@material-ui/icons/Event';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import MapIcon from '@material-ui/icons/Map'

import Link from "next/link";
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {defaultFont} from "../../assets/global-styles";
import {Theme, withTheme} from "@material-ui/core";

const useStyles = ({breakpoints}: Theme) => makeStyles({
    list : {
        ...defaultFont,
        fontSize: "14px",
        margin: 0,
        paddingLeft: "0",
        listStyle: "none",
        paddingTop: "0",
        paddingBottom: "0",
        color: "inherit"
    },
    listItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        padding: "0",
        [breakpoints.down("sm")]: {
            width: "100%",
            "&:after": {
                width: "calc(100% - 30px)",
                content: '""',
                display: "block",
                height: "1px",
                marginLeft: "15px",
                backgroundColor: "#e5e5e5"
            }
        }
    },
    navLink : {
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: 400,
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
            color: "inherit",
            background: "rgba(200, 200, 200, 0.2)"
        },
        [breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "15px",
            marginBottom: "8px",
            marginTop: "8px",
            textAlign: "left",
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        }
    },
    icons : {
        width: "20px",
        height: "20px",
        marginRight: "3px"
    },
    tooltip : {
        padding: "10px 15px",
        minWidth: "130px",
        color: "#555555",
        lineHeight: "1.7em",
        background: "#FFFFFF",
        border: "none",
        borderRadius: "3px",
        boxShadow:
            "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
        maxWidth: "200px",
        textAlign: "center",
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: "0.875em",
        fontStyle: "normal",
        fontWeight: 400,
        textShadow: "none",
        textTransform: "none",
        letterSpacing: "normal",
        wordBreak: "normal",
        wordSpacing: "normal",
        wordWrap: "normal",
        whiteSpace: "normal",
        lineBreak: "auto"
    },
    socialIcons : {
        position: "relative",
        fontSize: "20px !important",
        marginRight: "4px"
    },
});

interface HeaderLinksProps {
    theme: Theme
}

export const HeaderLinks: FC<HeaderLinksProps> = ({theme}) => {
    const classes = useStyles(theme)();
    return (
        <List className={classes.list}>

            <ListItem className={classes.listItem}>
                <Link href={"/news"}>
                    <a className={classes.navLink}><AnnouncementIcon className={classes.icons}/> News</a>
                </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Link href={"/races"}>
                    <a className={classes.navLink}><EventIcon className={classes.icons}/> Calendar</a>
                </Link>
            </ListItem>
            {/*<ListItem className={classes.listItem}>*/}
            {/*    <Link href={"/courses"}>*/}
            {/*        <a className={classes.navLink}><MapIcon className={classes.icons}/> Courses</a>*/}
            {/*    </Link>*/}
            {/*</ListItem>*/}
            <ListItem className={classes.listItem}>
                <Link href={"/eureka-covidsafe-plan"}>
                    <a className={classes.navLink}><AssignmentIcon className={classes.icons}/> COVIDSafe Plan</a>
                </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Link href={"/join"}>
                    <a className={classes.navLink}><PersonAddIcon className={classes.icons}/> Join</a>
                </Link>
            </ListItem>


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
export default withTheme(HeaderLinks);

import {AppBar, Button, IconButton, Menu, MenuItem, Theme, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/styles";
import {Secret} from "./Secret";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
export default function AdminAppBar({logout}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deployStatus, setDeployStatus] = React.useState(null);
    const classes = useStyles();
    const router = useRouter();
    const secret = useContext(Secret);

    useEffect(() => {
        if(deployStatus !== null && process.browser) {
            setTimeout(() => {
                // TODO: check the real status
                setDeployStatus(null)
            }, 90*1000)
        }
    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLink = (link) => {
        setAnchorEl(null);
        router.push(link)
    }

    const publish = () => {
        if(deployStatus === null) {
            setDeployStatus("Publishing")
            fetch(`/api/deploy?deploy=yes&secret=${secret}`, {method:"POST"} ).then(d => console.log(d)).catch(e => console.log(e))
        }
    }

    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                            onClick={handleClick}>
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleLink("/admin/races")}>Races</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/courses")}>Courses</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/results")}>Results</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/news")}>News</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/users")}>Users</MenuItem>
                </Menu>
                <Typography variant="h6" className={classes.title}>
                    Eureka Cycling - Admin
                </Typography>
                <Button onClick={publish} color="default" variant={"outlined"} disabled={deployStatus !== null}>{deployStatus === null ? "Publish" : deployStatus}</Button>
                <Button onClick={logout} color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    </div>
}

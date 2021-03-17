import {AppBar, Button, IconButton, Menu, MenuItem, Theme, Toolbar, Typography, withTheme} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, {FC, useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/styles";
import {Secret} from "./Secret";
import {MouseEvent} from "react";


const useStyles = (theme: Theme) => makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

interface AdminAppBarProps {
    logout: () => void
    theme: Theme
}

export const AdminAppBar:FC<AdminAppBarProps> = ({logout, theme}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement|null>(null);
    const [deployStatus, setDeployStatus] = React.useState<string|null>(null);
    const classes = useStyles(theme)();
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

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLink = (link: string) => {
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
                    <MenuItem onClick={() => handleLink("/admin/news")}>News</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/users")}>Users</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/images")}>Images</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/files")}>Files</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/site-settings#290096439678206473")}>Site Settings</MenuItem>
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

export default withTheme(AdminAppBar)

import {AppBar, Button, IconButton, Menu, MenuItem, Theme, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, {FC} from "react";
import {useRouter} from "next/router";
import {makeStyles} from "@mui/styles";
import {MouseEvent} from "react";

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

interface AdminAppBarProps {
    logout: () => void
}

export const AdminAppBar:FC<AdminAppBarProps> = ({logout}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement|null>(null);
    const classes = useStyles();
    const router = useRouter();

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

    const viewSite = () => {
        const {host, protocol, pathname, hash} = document.location
        let path = ""
        switch (pathname) {
            case '/admin/race':
                path = `/races/${hash.substring(1)}`
                break
            case '/admin/newsItem':
                path = `/news/${hash.substring(1)}`
                break
        }
        window.open(`${protocol}//${host}${path}`, '_blank')
    }

    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" title={'Menu'} aria-label="menu"
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
                    <MenuItem onClick={() => handleLink("/admin/editSeason")}>Edit Season</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/pages")}>Pages</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/courses")}>Courses</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/news")}>News</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/users")}>Users</MenuItem>
                    <MenuItem onClick={() => handleLink("/admin/site-settings#290096439678206473")}>Site Settings</MenuItem>
                </Menu>
                <Typography variant="h6" className={classes.title}>
                    Eureka Cycling - Admin
                </Typography>
                <Button onClick={viewSite} color="primary" variant={"outlined"}>View Site</Button>
                <Button onClick={logout} color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    </div>
}

export default AdminAppBar

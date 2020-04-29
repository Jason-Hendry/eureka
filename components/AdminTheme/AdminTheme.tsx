import React, {useState} from 'react'
import {AppBar, Typography, IconButton, Button, Toolbar, Container, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"
import {makeStyles} from "@material-ui/styles";
import Login from "../../pages-sections/Admin/Login";
import {Secret} from "./Secret";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 8,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function AdminTheme({children}) {
    const classes = useStyles();

    const [secret, setSecret] = useLocalStorage("secret", "")
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setSecret("")
    }

    return <Secret.Provider value={secret}>
        {secret ?
                <div className={classes.root}>
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
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                            <Typography variant="h6" className={classes.title}>
                                Eureka Cycling - Admin
                            </Typography>
                            <Button onClick={logout} color="inherit">Logout</Button>
                        </Toolbar>
                    </AppBar>
                <Container>
                    {children}
                </Container>
            </div> :
            <Container>
                <Login setSecret={setSecret}/>
            </Container>
        }
    </Secret.Provider>
}

// Hook
export function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

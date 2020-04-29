import React, {useState} from 'react'
import {AppBar, Typography, IconButton, Button, Toolbar, Container, Menu, MenuItem, Theme} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"
import {makeStyles} from "@material-ui/styles";
import Login from "../../pages-sections/Admin/Login";
import {Secret} from "./Secret";
import Link from "next/link";
import {useRouter} from "next/router";
import AdminAppBar from "./AppBar";



export default function AdminTheme({children}) {

    const [secret, setSecret] = useLocalStorage("secret", "")

    const logout = () => {
        setSecret("")
    }

    return <Secret.Provider value={secret}>
        {secret ? <AdminAppBar logout={logout}/> : null}
        <Container>{secret ? <div>{children}</div> : <Login login={(s) => setSecret(s)}/>}</Container>
    </Secret.Provider>
}

// Hook
export function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if (!process.browser) {
            return initialValue
        }
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
            // console.log(error);
        }
    };

    return [storedValue, setValue];
}

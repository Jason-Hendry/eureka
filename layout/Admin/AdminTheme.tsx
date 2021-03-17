import React, {FC, useState} from 'react'
import {Container} from "@material-ui/core";
import {Secret} from "./Secret";
import AdminAppBar from "./AppBar";
import {useRouter} from "next/router";

export const AdminTheme:FC<unknown> = ({children}) => {
    const router = useRouter()
    const [secret, setSecret] = useLocalStorage("secret", "")

    const logout = () => {
        setSecret("")
    }

    if(process.browser && !secret) {
        router.push("/login#"+encodeURIComponent(router.asPath))
    }

    return <Secret.Provider value={secret}>
        {secret ? <AdminAppBar logout={logout}/> : null}
            <Container><>{secret ? <div>{children}</div> : null }</></Container>
    </Secret.Provider>
}
export default AdminTheme;

// Hook
export function useLocalStorage(key: string, initialValue: unknown) {
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
    const setValue = (value:unknown) => {
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

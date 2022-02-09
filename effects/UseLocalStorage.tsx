// Hook
import {useState} from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T)=>void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (!process.browser) {
            return initialValue
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) as T : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    const setValue = (value: T): void => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}
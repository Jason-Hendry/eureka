import {useContext} from "react";
import {Secret} from "../layout/Admin/Secret";

export const useSecret = () => {
    return useContext(Secret)
}
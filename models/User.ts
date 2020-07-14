

// @ts-ignore
import {Image} from "./Image";

export interface User {
    id: string
    data: UserData
}
export type UserList = Array<User>;

export interface UserData {
    email: string
    name: string
    Images?: Image[]
}





// @ts-ignore
import {Image} from "./Image";
import {BaseList, BaseModel} from "./base";

export type User = BaseModel<UserData>
export type UserList = BaseList<UserData>;

export interface UserData {
    email: string
    name: string
    Images?: Image[]
}





import {BaseList, BaseModel} from "./base";

export type User = BaseModel<PageData>
export type PageList = BaseList<PageData>;

export interface PageData {
    url: string
    title: string
    content: string
}



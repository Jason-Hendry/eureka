import {BaseList, BaseModel} from "./base";

export type Image = BaseModel<ImageData>
export type ImageList = BaseList<ImageData>;

export interface ImageData {
    filename: string
    alt: string
    hero: string
    poster: string
    admin: string
}



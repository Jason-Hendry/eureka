import {BaseList, BaseModel} from "./base";

export type File = BaseModel<FileData>
export type FileList = BaseList<FileData>;

export interface FileData {
    filename: string
    alt: string
}





// @ts-ignore
import {Image} from "./Image";
import {BaseList, BaseModel} from "./base";

export type Results = BaseModel<ResultsData>
export type ResultsList = BaseList<ResultsData>;


export interface ResultsData {
    Title: string
    Date?: string
    Images?: Image[]
}



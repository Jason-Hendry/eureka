

// @ts-ignore
import {Image} from "./Image";

export interface Results {
    id: string
    data: ResultsData
}
export type ResultsList = Array<Results>;

export interface ResultsData {
    Title: string
    Date?: string
    Images?: Image[]
}



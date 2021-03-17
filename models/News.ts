import {FlexibleContent} from "./FlexibleContent";
import {Image} from "./Image";
import {BaseList, BaseModel} from "./base";

export type News = BaseModel<NewsData>
export type NewsList = BaseList<NewsData>;

export interface NewsData {
    Title: string
    Date?: string
    Teaser?: string
    Body?: string
    Content?: Array<FlexibleContent>
    Images?: Image[]
}

export function FilterHasDate() {
    return (n:News) => {
        console.log(n.data.Date)
        return (n.data.Date || false) !== false
    }
}


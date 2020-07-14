

// @ts-ignore
import {FlexibleContent} from "./FlexibleContent";
import {Image} from "./Image";

export interface News {
    id: string
    data: NewsData
}
export type NewsList = Array<News>;

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


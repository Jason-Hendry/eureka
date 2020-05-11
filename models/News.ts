

// @ts-ignore
import {FlexibleContent} from "./FlexibleContent";

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
}





// @ts-ignore
export interface News {
    id: string
    data: NewsData
}
export type NewsList = Array<News>;

export interface NewsData {
    Title: string
    Date?: string
}



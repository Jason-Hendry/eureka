
export type BaseModel<T> = {
    id: string
    data: T
    sortKey?: number
}
export type BaseList<T> = Array<BaseModel<T>>

export enum ModelCollection {
    Races = 'Races',
    News = 'News',
    Results = 'Results',
    User = 'User',
    Courses = 'Courses',
    Images = 'Images',
    SiteSettings = 'SiteSettings',
    Files = 'Files',
    Deploy = 'Deploy',
}

export type EmbeddedImage = {
    image: string
    altText: string
    caption?: string
}

export const BlankEmbeddedImage = (): EmbeddedImage => {
    return {
        image: "",
        altText: ""
    }
}
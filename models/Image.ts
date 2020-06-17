

// @ts-ignore
export interface Image {
    id: string
    data: ImageData
}
export type ImageList = Array<Image>;

export interface ImageData {
    filename: string
    alt: string
    hero: string
    poster: string
    admin: string
}



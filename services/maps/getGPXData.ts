import {parseString} from "xml2js";

export const getGPXData = (GPX: string): Promise<Gpxjs> => {
    return new Promise((resolve, reject) => {
        return parseString(GPX, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result as unknown as Gpxjs)
        })
    })
}

export interface Gpxjs {
    gpx: Gpx;
}

export interface Gpx {
    $: GpxClass;
    metadata: Metadatum[];
    trk: Trk[];
}

export interface GpxClass {
    creator: string;
    "xmlns:xsi": string;
    "xsi:schemaLocation": string;
    version: string;
    xmlns: string;
}

export interface Metadatum {
    name: string[];
    author: Author[];
    copyright: CopyrightElement[];
    link: LinkElement[];
}

export interface Author {
    name: string[];
    link: LinkElement[];
}

export interface LinkElement {
    $: Link;
}

export interface Link {
    href: string;
}

export interface CopyrightElement {
    $: Copyright;
    year: string[];
    license: string[];
}

export interface Copyright {
    author: string;
}

export interface Trk {
    name: string[];
    link: LinkElement[];
    type: string[];
    trkseg: Trkseg[];
}

export interface Trkseg {
    trkpt: TrkptElement[];
}

export interface TrkptElement {
    $: Trkpt;
    ele: string[];
}

export interface Trkpt {
    lat: string;
    lon: string;
}

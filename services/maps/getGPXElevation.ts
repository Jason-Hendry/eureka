import {Gpxjs, TrkptElement, Trkseg} from "./getGPXData";

export type ElevationArray = number[]
export const getGPXElevation = (GPX: Gpxjs): ElevationArray => {
    return GPX.gpx.trk.reduce((result: ElevationArray, trk) => [...result, ...getGPXPointsTrkSegElevation(trk.trkseg)], [] as ElevationArray)
}
const getGPXPointsTrkSegElevation = (trkSegs: Trkseg[]): ElevationArray => {
    return trkSegs.reduce((result: ElevationArray, trkSeg) => [...result, ...getGPXPointsTrkElementElevation(trkSeg.trkpt)], [] as ElevationArray)
}
const getGPXPointsTrkElementElevation = (trkptElement: TrkptElement[]): ElevationArray => {
    return trkptElement.reduce((result: ElevationArray, element) => [...result, getElevation(element)], [] as ElevationArray)
}
const getElevation = (el: TrkptElement): number => {
    return Number.parseFloat(el.ele[0])
}
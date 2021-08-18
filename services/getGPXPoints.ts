import {Gpxjs, TrkptElement, Trkseg} from "./getGPXData";

export type LatLog = [lat: number, lng: number]
export type LatLogArray = LatLog[]
export const getGPXPoints = (GPX: Gpxjs): LatLogArray => {
    return GPX.gpx.trk.reduce((result: LatLogArray, trk) => [...result, ...getGPXPointsTrkSeg(trk.trkseg)], [] as LatLogArray)
}
const getGPXPointsTrkSeg = (trkSegs: Trkseg[]): LatLogArray => {
    return trkSegs.reduce((result: LatLogArray, trkSeg) => [...result, ...getGPXPointsTrkElement(trkSeg.trkpt)], [] as LatLogArray)
}
const getGPXPointsTrkElement = (trkptElement: TrkptElement[]): LatLogArray => {
    return trkptElement.reduce((result: LatLogArray, element) => [...result, getLatLog(element)], [] as LatLogArray)
}
const getLatLog = (el: TrkptElement): LatLog => {
    return [Number.parseFloat(el['$'].lat), Number.parseFloat(el['$'].lon)]
}
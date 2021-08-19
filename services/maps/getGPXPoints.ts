import {Gpxjs, TrkptElement, Trkseg} from "./getGPXData";

export type LatLng = [lat: number, lng: number]
export type LatLngArray = LatLng[]
export const getGPXPoints = (GPX: Gpxjs): LatLngArray => {
    return GPX.gpx.trk.reduce((result: LatLngArray, trk) => [...result, ...getGPXPointsTrkSeg(trk.trkseg)], [] as LatLngArray)
}
const getGPXPointsTrkSeg = (trkSegs: Trkseg[]): LatLngArray => {
    return trkSegs.reduce((result: LatLngArray, trkSeg) => [...result, ...getGPXPointsTrkElement(trkSeg.trkpt)], [] as LatLngArray)
}
const getGPXPointsTrkElement = (trkptElement: TrkptElement[]): LatLngArray => {
    return trkptElement.reduce((result: LatLngArray, element) => [...result, getLatLog(element)], [] as LatLngArray)
}
const getLatLog = (el: TrkptElement): LatLng => {
    return [Number.parseFloat(el['$'].lat), Number.parseFloat(el['$'].lon)]
}
import {getGPXPoints, LatLngArray} from "./getGPXPoints";
import {ElevationArray, getGPXElevation} from "./getGPXElevation";
import {Gpxjs} from "./getGPXData";

export type GPXSimpleArrays = {
    latLong: LatLngArray
    elevation: ElevationArray
}
export const getGPXSimpleArrays = (gpx: Gpxjs): GPXSimpleArrays => {
    return {
        latLong: getGPXPoints(gpx),
        elevation: getGPXElevation(gpx)
    }
}
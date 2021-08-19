import {LatLngDistanceArray} from "./GetCourseLength";
import {Round} from "../formatting/Round";

export const courseTotalLength = (latLngDistance: LatLngDistanceArray): number => {
    return Round(latLngDistance[latLngDistance.length - 1][2], 1)
}
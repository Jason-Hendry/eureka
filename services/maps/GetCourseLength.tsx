import {LatLngArray} from "./getGPXPoints";
import {GetPointDistance} from "./GetPointDistance";

export type LatLngDistanceArray = [lat: number, lng: number, distance: number][]

export function GetCourseLength(path: LatLngArray): LatLngDistanceArray {
    let progressive = 0;
    return path.map((point, i) => {
            if (i === 0) {
                return [point[0], point[1], 0]
            }
            progressive += GetPointDistance(point, path[i - 1])
            return [point[0], point[1], progressive]
        }
    )
}
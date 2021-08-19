import {LatLng} from "./getGPXPoints";
import distance from "@turf/distance";

export function GetPointDistance(p1: LatLng, p0: LatLng): number {
    if (p0 && p1) {
        return distance(p0, p1, {units: "kilometers"});
    }
    return 0
}
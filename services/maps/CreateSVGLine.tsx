import {LatLngDistanceArray} from "./GetCourseLength";
import {ElevationArray} from "./getGPXElevation";
import {courseTotalLength} from "./CourseTotalLength";
import {GetMinMaxElevation} from "./GetMinMaxElevation";
import {distanceToX} from "./DistanceToX";
import {elevationToY} from "./ElevationToY";

export const CreateSVGLine = (width: number, height: number, path: LatLngDistanceArray, elevation: ElevationArray) => {
    const maxLength = courseTotalLength(path)
    const minMaxElevation = GetMinMaxElevation(elevation)

    return path.map(([, , distance], i) => {
        const x = distanceToX(distance, maxLength, width)
        const y = elevationToY(elevation[i], minMaxElevation, height)
        return `${x}, ${y}`

    }).join(" ")
}


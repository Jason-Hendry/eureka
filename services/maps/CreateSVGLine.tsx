import {LatLngDistanceArray} from "./GetCourseLength";
import {ElevationArray} from "./getGPXElevation";
import {courseTotalLength} from "./CourseTotalLength";
import {GetMinMaxElevation} from "./GetMinMaxElevation";
import {distanceToX} from "./DistanceToX";
import {elevationToY} from "./ElevationToY";

export const CreateSVGLine = (width: number, height: number, path: LatLngDistanceArray, elevation: ElevationArray, elevationRange: [number,number]) => {
    const maxLength = courseTotalLength(path)

    return path.map(([, , distance], i) => {
        const x = distanceToX(distance, maxLength, width)
        const y = elevationToY(elevation[i], elevationRange, height)
        return `${x}, ${y}`

    }).join(" ")
}


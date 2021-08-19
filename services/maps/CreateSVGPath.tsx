import {LatLngDistanceArray} from "./GetCourseLength";
import {ElevationArray} from "./getGPXElevation";
import {courseTotalLength} from "./CourseTotalLength";
import {GetMinMaxElevation} from "./GetMinMaxElevation";

export const CreateSVGPath = (width: number, height: number, path: LatLngDistanceArray, elevation: ElevationArray) => {
    const maxLength = courseTotalLength(path)
    const minMaxElevation = GetMinMaxElevation(elevation)
    const range = minMaxElevation[1] - minMaxElevation[0]

    return path.map(([, , distance], i) => {
        const zeroedElevation = elevation[i] - minMaxElevation[0]
        const x = distance / maxLength * width
        const y = zeroedElevation / range * height
        if (i == 0) {

            return `M 0 0 L ${x} ${height - y}`
        }
        if (i == path.length - 1) {
            return `L ${x} ${height - y} L ${x} 0`
        }
        return `L ${x} ${height - y}`

    }).join(" ")
}



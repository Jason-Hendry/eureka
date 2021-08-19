import {ElevationArray} from "./getGPXElevation";

export function GetMinMaxElevation(elevation: ElevationArray): [min: number, max: number] {
    return elevation.reduce(([minOld, maxOld], point) => {
        const min = point < minOld ? point : minOld
        const max = point > maxOld ? point : maxOld
        return [min, max]
    }, [elevation[0], elevation[0]])
}


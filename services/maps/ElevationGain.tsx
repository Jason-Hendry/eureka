import {ElevationArray} from "./getGPXElevation";

export function elevationGain(elevation: ElevationArray): number {
    return elevation.reduce((gain, point, i) => {
        if (i === 0) {
            return 0
        }
        const diff = point - elevation[i - 1]
        if (diff > 0) {
            return gain + diff
        }
        return gain
    }, 0)
}


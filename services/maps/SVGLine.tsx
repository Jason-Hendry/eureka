import {LatLngDistanceArray} from "./GetCourseLength";
import {ElevationArray} from "./getGPXElevation";
import {courseTotalLength} from "./CourseTotalLength";
import {distanceToX} from "./DistanceToX";
import {elevationToY} from "./ElevationToY";
import React, {VFC} from "react";

export type SVGLineProps = {
    width: number, height: number, path: LatLngDistanceArray, elevation: ElevationArray, elevationRange: [number,number]
}

export const SVGLine: VFC<SVGLineProps> = ({width,height,path,elevation,elevationRange}) => {
    const maxLength = courseTotalLength(path)

    const svgPath = path.map(([, , distance], i) => {
        const x = distanceToX(distance, maxLength, width)
        const y = elevationToY(elevation[i], elevationRange, height)
        return `${x}, ${y}`
    }).join(" ")

    return <polyline fill={'none'} stroke={'#6c6c6c'} strokeWidth={2} points={svgPath}/>

}


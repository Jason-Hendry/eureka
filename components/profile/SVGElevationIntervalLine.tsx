import {VFC} from "react";
import {elevationToY} from "../../services/maps/ElevationToY";
import {SVGElevationIntervalLinesProps} from "./SVGElevationIntervalLines";

type lineProps = Omit<SVGElevationIntervalLinesProps, 'intervals'> & {
    elevation: number
}
export const SVGElevationIntervalLine: VFC<lineProps> = ({elevationRange, height, elevation, width,}) => {
    const y = elevationToY(elevation, elevationRange, height)
    return <line data-altitude={elevation} stroke={"#ccc"} strokeWidth={1} x1={0} x2={width} y1={y} y2={y}/>
}
import {VFC} from "react";
import {distanceToX} from "../../services/maps/DistanceToX";
import {SVGDistanceIntervalLinesProps} from "./SVGDistanceIntervalLines";

type SVGDistanceIntervalLineProps = Omit<SVGDistanceIntervalLinesProps, 'intervals'> & {
    distance: number
}
export const SVGDistanceIntervalLine: VFC<SVGDistanceIntervalLineProps> = ({
                                                                                     distance,
                                                                                     totalLength,
                                                                                     width,
                                                                                     height,
                                                                                 }) => {
    const x = distanceToX(distance, totalLength, width)
    return <line data-distance={distance} stroke={"#ccc"} strokeWidth={1} x1={x} x2={x} y1={0} y2={height}/>
}
import {VFC} from "react";
import {distanceToX} from "./DistanceToX";

export const CreateSVGDistanceIntervalLine = (distance: number, totalLength: number, width: number, height: number) => {
    const x = distanceToX(distance, totalLength, width)
    return <line data-distance={distance} stroke={"#ccc"} strokeWidth={1} x1={x} x2={x} y1={0} y2={height}/>
}
type CreateSVGDistanceIntervalLinesProps = { intervals: number[], totalLength: number, width: number, height: number }
export const CreateSVGDistanceIntervalLines: VFC<CreateSVGDistanceIntervalLinesProps> = ({
                                                                                               intervals,
                                                                                              totalLength,
                                                                                               width,
                                                                                               height
                                                                                           }) => {
    return <>
        {intervals.map(distance => CreateSVGDistanceIntervalLine(distance, totalLength, width, height))}
    </>
}
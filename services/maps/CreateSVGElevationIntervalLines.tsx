import {elevationToY} from "./ElevationToY";
import {VFC} from "react";

export const CreateSVGElevationIntervalLine = (elevation: number, elevationRange: [number, number], width: number, height: number) => {
    const y = elevationToY(elevation, elevationRange, height)
    return <line data-altitude={elevation} stroke={"#ccc"} strokeWidth={1} x1={0} x2={width} y1={y} y2={y}/>
}
type CreateSVGElevationIntervalLinesProps = { intervals: number[], elevationRange: [number, number], width: number, height: number }
export const CreateSVGElevationIntervalLines: VFC<CreateSVGElevationIntervalLinesProps> = ({
                                                                                               intervals,
                                                                                               elevationRange,
                                                                                               width,
                                                                                               height
                                                                                           }) => {
    return <>
        {intervals.map(elevation => CreateSVGElevationIntervalLine(elevation, elevationRange, width, height))}
    </>
}
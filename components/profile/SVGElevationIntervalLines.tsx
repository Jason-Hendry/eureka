import {VFC} from "react";
import {SVGElevationIntervalLine} from "./SVGElevationIntervalLine";

export type SVGElevationIntervalLinesProps = { intervals: number[], elevationRange: [number, number], width: number, height: number }
export const SVGElevationIntervalLines: VFC<SVGElevationIntervalLinesProps> = ({
                                                                                               intervals,
                                                                                               ...rest
                                                                                           }) => {
    return <>
        {intervals.map(elevation => <SVGElevationIntervalLine key={elevation} elevation={elevation} {...rest} />)}
    </>
}
import {VFC} from "react";
import {SVGDistanceIntervalLine} from "./SVGDistanceIntervalLine";

export type SVGDistanceIntervalLinesProps = { intervals: number[], totalLength: number, width: number, height: number }
export const SVGDistanceIntervalLines: VFC<SVGDistanceIntervalLinesProps> = ({
                                                                                               intervals,
                                                                                              ...rest
                                                                                           }) => {
    return <>
        {intervals.map(distance => <SVGDistanceIntervalLine key={distance} distance={distance} {...rest} />)}
    </>
}
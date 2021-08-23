import {MouseEvent, useEffect, useRef, useState, VFC} from "react";
import {ElevationArray} from "../../services/maps/getGPXElevation";
import {LatLng, LatLngArray} from "../../services/maps/getGPXPoints";
import {StatsTable} from "./StatsTable";
import {GetCourseLength} from "../../services/maps/GetCourseLength";
import {courseTotalLength} from "../../services/maps/CourseTotalLength";
import {Round} from "../../services/formatting/Round";
import {GetMinMaxElevation} from "../../services/maps/GetMinMaxElevation";
import {elevationGain} from "../../services/maps/ElevationGain";
import {SVGLine} from "../../services/maps/SVGLine";
import {GetRangeIntervals} from "../../services/maps/GetRangeIntervals";
import {SVGElevationIntervalLines} from "./SVGElevationIntervalLines";
import {SVGDistanceIntervalLines} from "./SVGDistanceIntervalLines";

interface CourseProfileProps {
    path: LatLngArray
    elevation: ElevationArray
    showLocation: (position: LatLng) => void
}

export const CourseProfile: VFC<CourseProfileProps> = ({elevation, path, showLocation}) => {

    const svgContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        onPageResize()
        window.addEventListener('resize', onPageResize)
        return () => {
            window.removeEventListener('resize', onPageResize)
        }
    }, [])

    const onPageResize = () => {
        if(svgContainerRef.current) {
            console.log(svgContainerRef.current.getBoundingClientRect().width)
            setWidth(svgContainerRef.current.getBoundingClientRect().width)
        }
    }

    const [width, setWidth] = useState<number>(100)
    const height = 100

    const courseLatLngDist = GetCourseLength(path)
    const totalLength = courseTotalLength(courseLatLngDist)
    const maxLength = courseTotalLength(courseLatLngDist)
    const minMaxElevation = GetMinMaxElevation(elevation)
    const profileRange: [number,number] = [minMaxElevation[0]-20, (height/width * totalLength * 1000)/15] // Adjust profile against race length - exaggerate by 10 time the elevation

    const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const dist = x/width*maxLength
        console.log({dist})
        const pos = courseLatLngDist.find(([,,d]) => d>dist)
        console.log(pos)
        if(pos) {
            showLocation([pos[0], pos[1]])
        }
    }

    return <>
        <div onMouseMove={mouseMove} ref={svgContainerRef}>
        <svg width={'100%'} height={height}>
            <SVGElevationIntervalLines intervals={GetRangeIntervals(profileRange, 100)} height={height} width={width} elevationRange={profileRange} />
            <SVGDistanceIntervalLines intervals={GetRangeIntervals([0, totalLength], 10)} height={height} width={width} totalLength={totalLength} />
            <SVGLine width={width} height={height} path={courseLatLngDist} elevation={elevation} elevationRange={profileRange} />
        </svg>
        </div>
        <StatsTable data={[
            ['Course Length', `${totalLength}km`],
            ['Elevation Gain', `${Round(elevationGain(elevation),0)}m`],
            ['Elevation Min', `${Round(minMaxElevation[0], 1)}m`],
            ['Elevation Max', `${Round(minMaxElevation[1], 1)}m`],
        ]}/>
    </>
}


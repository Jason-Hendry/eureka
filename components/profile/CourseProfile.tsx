import {VFC, MouseEvent} from "react";
import {ElevationArray} from "../../services/getGPXElevation";
import {LatLng, LatLngArray} from "../../services/getGPXPoints";
import distance from '@turf/distance'

interface CourseProfileProps {
    path: LatLngArray
    elevation: ElevationArray
    showLocation: (position: LatLng) => void
}

type LatLngDistanceArray = [lat: number, lng: number, distance: number][]

function GetCourseLength(path: LatLngArray): LatLngDistanceArray {
    let progressive = 0;
    return path.map((point, i) => {
            if (i === 0) {
                return [point[0], point[1], 0]
            }
            progressive += GetPointDistance(point, path[i - 1])
            return [point[0], point[1], progressive]
        }
    )
}

function GetPointDistance(p1: LatLng, p0: LatLng): number {
    if(p0 && p1) {
        return distance(p0, p1, {units: "kilometers"});
    }
    return 0
}

const courseTotalLength = (latLngDistance: LatLngDistanceArray): number => {
  return Round(latLngDistance[latLngDistance.length-1][2], 1)
}

const Round = (n: number, digits: number) => {
    const tens = Math.pow(10, digits)
    return Math.round(n*tens)/tens;
}

function GetMinMaxElevation(elevation: ElevationArray): [min: number,max: number] {
    return elevation.reduce(([minOld,maxOld], point) => {
        const min = point < minOld ? point : minOld
        const max = point > maxOld ? point : maxOld
        return [min, max]
    }, [elevation[0],elevation[0]])
}

const CreateSVGPath = (width: number, height: number, path: LatLngDistanceArray, elevation: ElevationArray) => {
    const maxLength = courseTotalLength(path)
    const minMaxElevation = GetMinMaxElevation(elevation)
    const range = minMaxElevation[1]-minMaxElevation[0]

    return path.map(([,,distance], i) => {
      const zeroedElevation = elevation[i] - minMaxElevation[0]
      const x = distance/maxLength * width
      const y = zeroedElevation/range * height
      if(i == 0) {

          return `M 0 0 L ${x} ${height-y}`
      }
      if(i == path.length-1) {
          return `L ${x} ${height-y} L ${x} 0`
      }
      return `L ${x} ${height-y}`

  }).join(" ")
}

export const CourseProfile: VFC<CourseProfileProps> = ({elevation, path, showLocation}) => {

    const width = 600
    const height = 200

    const courseLatLngDist = GetCourseLength(path)
    const maxLength = courseTotalLength(courseLatLngDist)
    const minMaxElevation = GetMinMaxElevation(elevation)

    const svgPath = CreateSVGPath(width, height, GetCourseLength(path), elevation)

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
        Elevation Min: {Round(minMaxElevation[0], 1)}m
        Elevation Max: {Round(minMaxElevation[1], 1)}m
        Course Length: {courseTotalLength(courseLatLngDist)}km
        <div onMouseMove={mouseMove}>
        <svg width={width} height={height}>
            <path color={'rgba(0,0,0,0.45)'} d={svgPath}/>
        </svg>
        </div>
    </>
}


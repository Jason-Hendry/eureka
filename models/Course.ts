

// @ts-ignore
import {Image} from "./Image";
import {BaseList, BaseModel} from "./base";
import {GPXSimpleArrays} from "../services/getGPXSimpleArrays";
import {LatLng} from "../services/getGPXPoints";

export type Course = BaseModel<CourseData>
export type CourseList = BaseList<CourseData>;


export interface CourseData {
    Title: string
    LapDistance: number|null
    GPXFile: string|null
    RegistrationLocation: LatLng|null
    RegistrationInformation: string|null

    GPXData?: GPXSimpleArrays
}

export const GetCourse = (course: BaseList<CourseData>, id: string): CourseData|undefined => {
    return course.find(c => c.id === id)?.data
}



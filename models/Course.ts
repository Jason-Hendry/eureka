

// @ts-ignore
import {Image} from "./Image";
import {BaseList, BaseModel} from "./base";

export type Course = BaseModel<CourseData>
export type CourseList = BaseList<CourseData>;


export interface CourseData {
    Title: string
    LapDistance?: number
    Images?: Image[]
    Map?: {
        center?: {
            lat: number,
            lng: number
        }
    }
}

export const GetCourse = (course: BaseList<CourseData>, id: string): CourseData|undefined => {
    return course.find(c => c.id === id)?.data
}

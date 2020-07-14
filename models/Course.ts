

// @ts-ignore
import {Image} from "./Image";

export interface Course {
    id: string
    data: CourseData
}
export type CourseList = Array<Course>;

export interface CourseData {
    Title: string
    LapDistance?: number
    Images?: Image[]
}



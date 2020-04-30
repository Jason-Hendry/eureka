

// @ts-ignore
export interface Course {
    id: string
    data: CourseData
}
export type CourseList = Array<Course>;

export interface CourseData {
    Title: string
    LapDistance?: number
}



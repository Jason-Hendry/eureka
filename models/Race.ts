

// @ts-ignore
import {User, UserList} from "./User";
import {FormLabel} from "@material-ui/core";
import React from "react";
import {Course, CourseList} from "./Course";
import {isFuture, parse} from "date-fns";
import {Image} from "./Image";

export interface Race {
    id: string
    data: RaceData
    sortKey?: number
}
export type RaceList = Array<Race>;

export enum RaceFormat {
    Criterium = 'Criterium',
    Handicap = 'Handicap' ,
    GradedPointsRace = 'Graded Points Race' ,
    Graded = 'Graded',
    TimeTrial = 'Time Trial'
}

export interface RaceData {
    Title: string
    Date?: string
    RegistrationCutoff?: string
    RaceStartTime?: string
    Course?: string
    CourseData?: Course
    CourseLaps?: number
    RaceFormat?: RaceFormat
    Marshalls?: Array<string>
    MarshallNames?: Array<string>
    Cancelled?: Boolean
    Postponed?: Boolean
    VCVEvent?: Boolean
    Interclub?: Boolean
    Trophy?: Boolean
    ClubChamps?: Boolean
    RegistrationURL? :string
    Series? :string
    Images?: Image[]
}

export function FilterFutureRace() {
    return (r:Race): boolean => {
        const raceDate = r.data?.Date ? parse(r.data.Date, "yyyy-MM-dd", new Date()) : null;
        // console.log(r.data, (r.data !== undefined) && raceDate && isFuture(raceDate))
        return (r.data != undefined) && raceDate && isFuture(raceDate)
    }
}

export function MergeCourseUserData(courses: CourseList, users: UserList) {
    return (r:Race): Race => {
        const courseData = courses.filter((c:Course) => c.id == r?.data?.Course).pop()
        if (courseData) {
            r.data.CourseData = courseData
        }
        r.data.MarshallNames = r.data?.Marshalls ? users.filter(c => r.data.Marshalls.indexOf(c.id) != -1).map(u => u.data.name) : [];
        return r
    }
}

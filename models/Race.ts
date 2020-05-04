

// @ts-ignore
import {User} from "./User";
import {FormLabel} from "@material-ui/core";
import React from "react";
import {Course} from "./Course";

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
}



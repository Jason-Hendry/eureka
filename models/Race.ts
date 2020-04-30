

// @ts-ignore
import {User} from "./User";
import {FormLabel} from "@material-ui/core";
import React from "react";

export interface Race {
    id: string
    data: RaceData
}
export type RaceList = Array<Race>;

export enum RaceFormat {
    Criterium = 'Criterium',
    Handicap = 'Handicap' ,
    GradedPointsRace = 'Graded Points Race' ,
    Graded = 'Graded'
}

export interface RaceData {
    Title: string
    Date?: string
    RegistrationCutoff?: string
    RaceStartTime?: string
    Course?: string
    CourseLaps?: number
    RaceFormat?: RaceFormat
    Marshalls?: Array<User>
    Cancelled?: Boolean
    Postponed?: Boolean
    VCVEvent?: Boolean
    Interclub?: Boolean
    RegistrationURL? :string
}



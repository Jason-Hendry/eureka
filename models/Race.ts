import {UserList} from "./User";
import {Course, CourseList} from "./Course";
import {isFuture, parse} from "date-fns";
import {Image} from "./Image";
import {BaseList, BaseModel} from "./base";

export type Race = BaseModel<RaceData>
export type RaceList = BaseList<RaceData>;

export enum RaceFormat {
    Criterium = 'Criterium',
    Handicap = 'Handicap' ,
    GradedPointsRace = 'Graded Points Race' ,
    Graded = 'Graded',
    TimeTrial = 'Time Trial'
}

export interface ResultPlace {
    position: number,
    rider: string,
    aggregatePoints: number,
}

export interface DivisionResult {
    divisionNumber: number
    results: ResultPlace[]
}
export const BlankDivisionResult = (places: number) => {
    return (): DivisionResult => ({
        divisionNumber: 0,
        results: BlankResultPlaces(places)
    })
}
export const BlankResultPlaces = (places: number): ResultPlace[] => {
    return Array.from({length: places}, (_,k) => ({
        position: k+1,
        rider: "",
        aggregatePoints: places-k
    }))
}

export interface RaceData {
    Title: string
    Date?: string
    RegistrationCutoff?: string
    RaceStartTime?: string
    Course?: string
    CourseLaps?: number
    RaceFormat?: RaceFormat
    Marshals?: string
    Cancelled?: boolean
    Postponed?: boolean
    VCVEvent?: boolean
    Interclub?: boolean
    BSCC?: boolean
    Trophy?: boolean
    ClubChamps?: boolean
    RegistrationURL? :string
    Series? :string
    Notes? :string
    Images?: Image[]
    Poster?: string
    MapImage?: string
    MapDownload?: string
    divisionResults?: DivisionResult[]
    results?: ResultPlace[]
}

export type RaceMergeData = RaceData & {
    CourseData: Course | null
    MarshallNames: Array<string>
}

export function FilterFutureRace() {
    return (r:Race): boolean => {
        const raceDate = r.data?.Date ? parse(r.data.Date, "yyyy-MM-dd", new Date()) : false;
        return (r.data != undefined) && (raceDate && isFuture(raceDate))
    }
}

export function MergeCourseUserData(courses: CourseList, users: UserList) {
    return (r:Race): BaseModel<RaceMergeData> => {
        const CourseData = courses.filter((c:Course) => c.id == r?.data?.Course).pop() || null
        const MarshallNames = r.data?.Marshals ? users.filter(c => r.data.Marshals?.indexOf(c.id) != -1).map(u => u.data.name) : [];
        return {...r, data: {...r.data, CourseData, MarshallNames}}
    }
}

export const RaceTitle: (r: RaceMergeData) => string = (r) => {
    if (r.Title) {
        return r.Title
    }
    const title = [];
    if (r.RaceFormat) {
        title.push(r.RaceFormat)
    }
    if (r.CourseData?.data?.Title) {
        title.push(r.CourseData?.data?.Title)
    }
    return title.join(' - ')
}

export const BlankRace = (): RaceData => {
    return {
        Title: ""
    }
}
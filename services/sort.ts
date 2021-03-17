import {Race} from "../models/Race";
import {format, parse} from "date-fns";

interface dataDate {
    Date?: string
}

interface withDate {
    data: dataDate
}

export function dateSortCompareOldestFirst(a: withDate, b: withDate) {
    return getANum(a) - getANum(b)
}

export function dateSortCompareNewestFirst(a: withDate, b: withDate) {
    return getANum(b) - getANum(a)
}

export function thisYear(year: number) {
    return (a: withDate) => {
        return getAYear(a) == year
    }
}


function getANum(a: withDate) {
    return a?.data?.Date ? parseInt(format(parse(a.data.Date, "yyyy-MM-dd", new Date()), 'yyyyDDD')) : 0;
}
function getAYear(a: withDate) {
    return a?.data?.Date ? parseInt(format(parse(a.data.Date, "yyyy-MM-dd", new Date()), 'yyyy')) : 0;
}

export function LimitFilter(limit: number) {
    return (_:any,i:number) => {
        return i < limit;
    }
}


type withDataField<T extends string> = {data:Record<T, string>}
function get<T extends string>(field: T, a: withDataField<T>): string {
    return a.data[field]
}
export function sortBy<T extends string>(field: T, a: withDataField<T>, b:withDataField<T>): number {
    return get<T>(field,a).localeCompare(get<T>(field,b))
}

export const sortByName =(a: withDataField<'name'>,b: withDataField<'name'>) => sortBy<'name'>('name', a, b,)
export const sortByFilename =(a: withDataField<'filename'>,b: withDataField<'filename'>) => sortBy<'filename'>('filename', a, b,)
export const sortByTitle =(a: withDataField<'Title'>,b: withDataField<'Title'>) => sortBy<'Title'>('Title', a, b,)




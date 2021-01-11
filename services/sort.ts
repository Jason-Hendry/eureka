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

export function thisYear(year) {
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

export function LimitFilter(limit) {
    return (_:any,i:number) => {
        return i < limit;
    }
}

interface dataTitle {
    Title?: string
}

interface withTitle {
    data: dataTitle
}

function getTitle(a: withTitle) {
    return a?.data?.Title || ""
}

export function sortByTitle(a: withTitle, b:withTitle): number {
    return getTitle(a).localeCompare(getTitle(b))
}

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

function getANum(a: withDate) {
    return a?.data.Date ? parseInt(format(parse(a.data.Date, "yyyy-MM-dd", new Date()), 'yyyyDDD')) : 0;
}

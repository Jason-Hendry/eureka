import {Race} from "../models/Race";
import {format, parse} from "date-fns";

export function raceSortCompare(a: Race, b: Race) {
    const aNum = a?.data.Date ? parseInt(format(parse(a.data.Date, "yyyy-MM-dd", new Date()), 'yyyyDDD')) : 0
    const bNum = b?.data.Date ? parseInt(format(parse(b.data.Date, "yyyy-MM-dd", new Date()), 'yyyyDDD')) : 0
    return aNum - bNum
}

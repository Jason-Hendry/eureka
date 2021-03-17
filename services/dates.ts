import {format, parse} from "date-fns";

export function NowISODate(): string {
    return format(new Date(), 'yyyy-MM-dd')
}

export function ISODateToPretty(isoDate?: string): string {
    if(!isoDate) {
        return ""
    }
    return format(parse(isoDate, 'yyyy-MM-dd', new Date()), 'eeee do MMM yyyy')
}

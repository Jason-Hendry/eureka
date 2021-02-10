

// @ts-ignore
import {Image} from "./Image";

export interface SiteSetting {
    id: string
    data: SiteSettingData
}
export type CourseList = Array<SiteSetting>;

export interface SiteSettingData {
    // Title: string
    // LapDistance?: number
    HomePageImages?: Image[]
}



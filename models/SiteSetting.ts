

// @ts-ignore
import {Image} from "./Image";
import {BaseList, BaseModel} from "./base";
import {AWSCredentials} from "../services/Login";
import {Credentials} from "aws-sdk/clients/sts";

export type SiteSetting = BaseModel<SiteSettingData>
export type SiteSettingList = BaseList<SiteSettingData>;

export interface SiteSettingData {
    // Title: string
    // LapDistance?: number
    HomePageImages?: Image[]
    HomePageImage: string
    awsCredentials?: Credentials
}



import {Image} from "./Image";
import {BaseList, BaseModel} from "./base";
import {AWSCredentials} from "../services/Login";
import {LatLng} from "../services/getGPXPoints";

export type SiteSetting = BaseModel<SiteSettingData>
export type SiteSettingList = BaseList<SiteSettingData>;

export interface SiteSettingData {
    HomePageImages?: Image[]
    HomePageImage: string
    EurekaClubHouseLocation: LatLng|null
    EurekaClubHouseRegistration: string|null

    // Special Site Settings for backend
    awsCredentials?: AWSCredentials
}



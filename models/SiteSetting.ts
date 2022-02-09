import {BaseList, BaseModel, EmbeddedImage} from "./base";
import {AWSCredentials} from "../services/Login";
import {LatLng} from "../services/maps/getGPXPoints";

export type SiteSetting = BaseModel<SiteSettingData>
export type SiteSettingList = BaseList<SiteSettingData>;

export interface SiteSettingData {
    HomePageImages: EmbeddedImage[]
    HomePageImage: string

    HomePageText: string

    EurekaClubHouseLocation: LatLng|null
    EurekaClubHouseRegistration: string|null

    // Special Site Settings for backend
    awsCredentials?: AWSCredentials
}



import {BaseList, BaseModel} from "./base";

export type Deploy = BaseModel<DeployData>
export type DeployList = BaseList<DeployData>;

export interface DeployData {
    date: string
}



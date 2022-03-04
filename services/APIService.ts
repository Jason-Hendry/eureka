import {RaceData} from "../models/Race";
import {NewsData} from "../models/News";
import {ResultsData} from "../models/Results";
import {UserData} from "../models/User";
import {CourseData} from "../models/Course";
import {SiteSettingData} from "../models/SiteSetting";
import {ImageData} from "../models/Image";
import {BaseList, BaseModel, ModelCollection} from "../models/base";
import {Collection} from "./DirectService";
import {
    CreateRequest,
    CrudBaseRequest,
    CrudBaseRequestWithId,
    CrudlRequest, DeleteRequest,
    ListRequest,
    ReadRequest, UpdateRequest
} from "../pages/api/crud";
import {FileData} from "../models/File";
import {DeployData} from "../models/Deploy";
import {PageData} from "../models/Page";

export class CollectionAPI<T> extends Collection<T> {

    constructor(collection: ModelCollection, secret: string) {
        super(collection, secret)
    }

    baseRequest(): CrudBaseRequest {
        return {query: { collection: this.collection, secret: this.secret }};
    };
    baseRequestId(id: string): CrudBaseRequestWithId {
        return {query: { collection: this.collection, secret: this.secret, id: id }};
    };

    list(): Promise<BaseList<T>> {
        return DoCrudRequest<BaseList<T>, ListRequest>({...this.baseRequest(), method: "GET"})
    }

    get(id: string): Promise<BaseModel<T>> {
        const req: ReadRequest = {...this.baseRequestId(id) , method: "GET"}
        return DoCrudRequest<BaseModel<T>, ReadRequest>(req)
    }

    post(data: T): Promise<BaseModel<T>> {
        const req: CreateRequest = {...this.baseRequest() , method: "POST"}
        return DoCrudRequest<BaseModel<T>, CreateRequest>(req, data)
    }

    put(data: T, id: string): Promise<BaseModel<T>>  {
        const req: UpdateRequest = {...this.baseRequestId(id) , method: "PUT"}
        return DoCrudRequest<BaseModel<T>, UpdateRequest>(req, data)
    }
    delete(data: T, id: string): Promise<BaseModel<T>>  {
        const req: DeleteRequest = {...this.baseRequestId(id) , method: "DELETE"}
        return DoCrudRequest<BaseModel<T>, DeleteRequest>(req, data)
    }
}

export const RaceCollectionApi = (secret: string) => new CollectionAPI<RaceData>(ModelCollection.Races, secret)
export const NewsCollectionApi = (secret: string) => new CollectionAPI<NewsData>(ModelCollection.News, secret)
export const ResultsCollectionApi = (secret: string) => new CollectionAPI<ResultsData>(ModelCollection.Results, secret)
export const UserCollectionApi = (secret: string) => new CollectionAPI<UserData>(ModelCollection.User, secret)
export const PageCollectionApi = (secret: string) => new CollectionAPI<PageData>(ModelCollection.Page, secret)
export const CoursesCollectionApi = (secret: string) => new CollectionAPI<CourseData>(ModelCollection.Courses, secret)
export const ImagesCollectionApi = (secret: string) => new CollectionAPI<ImageData>(ModelCollection.Images, secret)
export const SiteSettingsCollectionApi = (secret: string) => new CollectionAPI<SiteSettingData>(ModelCollection.SiteSettings, secret)
export const FilesCollectionApi = (secret: string) => new CollectionAPI<FileData>(ModelCollection.Files, secret)
export const DeployCollectionApi = (secret: string) => new CollectionAPI<DeployData>(ModelCollection.Deploy, secret)

export const DoCrudRequest = <T, K extends CrudlRequest>(req: K, body?: unknown): Promise<T> => {
    const queryString: string = (Object.keys(req.query) as (keyof typeof req.query)[]).map((k)=> `${k}=${req.query[k]}`).join('&');

    return fetch(`/api/crud?${queryString}`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    })
        .then(res => <T><unknown>res.json())
}

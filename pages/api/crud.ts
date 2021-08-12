import {NextApiRequest, NextApiResponse} from "next";
import {ModelCollection} from "../../models/base";
import {
    Collection,
    CoursesCollection, DeployCollection, FilesCollection,
    ImagesCollection, NewsCollection,
    RaceCollection, SiteSettingsCollection,
    UserCollection
} from "../../services/DirectService";

type BaseQuery = {
    collection: ModelCollection, secret: string
};
type QueryWithId = BaseQuery & {
    id: string
};

export interface CrudBaseRequest {
    query: BaseQuery
}
export interface CrudBaseRequestWithId {
    query: QueryWithId
}

export interface ReadRequest extends CrudBaseRequestWithId {
    method: "GET",
}

export const isReadRequest = (req: CrudlRequest): req is ReadRequest => {
    return req.method == "GET" && (req.query as object).hasOwnProperty('id');
}

export interface ListRequest extends CrudBaseRequest {
    method: "GET",
}

export const isListRequest = (req: CrudlRequest): req is ListRequest => {
    return req.method == "GET" && !(req.query as object).hasOwnProperty('id');
}

export interface CreateRequest extends CrudBaseRequest {
    method: "POST",
}

export const isCreateRequest = (req: CrudlRequest): req is CreateRequest => {
    return req.method == "POST" && !(req.query as object).hasOwnProperty('id');
}

export interface UpdateRequest extends CrudBaseRequestWithId {
    method: "PUT",
}

export const isUpdateRequest = (req: CrudlRequest): req is UpdateRequest => {
    return req.method == "PUT" && (req.query as object).hasOwnProperty('id');
}

export interface DeleteRequest extends CrudBaseRequest {
    method: "DELETE",
    query: QueryWithId
}

export const isDeleteRequest = (req: CrudlRequest): req is DeleteRequest => {
    return req.method == "DELETE" && (req.query as object).hasOwnProperty('id');
}

export type CrudlRequest = CreateRequest | ReadRequest | UpdateRequest | DeleteRequest | ListRequest

export default (req: CrudlRequest & NextApiRequest, res: NextApiResponse) => {
    const {query: {collection, secret}} = req;
    let coll: Collection<unknown>;
    switch (collection) {
        case ModelCollection.Courses:
            coll = CoursesCollection(secret)
            break;
        case ModelCollection.Races:
            coll = RaceCollection(secret)
            break;
        case ModelCollection.Images:
            coll = ImagesCollection(secret)
            break;
        case ModelCollection.User:
            coll = UserCollection(secret)
            break;
        case ModelCollection.SiteSettings:
            coll = SiteSettingsCollection(secret)
            break;
        case ModelCollection.News:
            coll = NewsCollection(secret)
            break;
        case ModelCollection.Files:
            coll = FilesCollection(secret)
            break;
        case ModelCollection.Deploy:
            coll = DeployCollection(secret)
            break;
        default:
            return;
    }
    if(isCreateRequest(req)) {
        coll.post(req.body).then(res.json).then(coll.onCreate).catch()
    }
    else if(isReadRequest(req)) {
        coll.get(req.query.id).then(res.json)
    }
    else if(isListRequest(req)) {
        coll.list().then(res.json)
    }
    else if(isUpdateRequest(req)) {
        coll.put(req.body, req.query.id).then(res.json)
    }
    else if(isDeleteRequest(req)){
        coll.delete(req.body, req.query.id).then(res.json)
    }
}

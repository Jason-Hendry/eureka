import {NextApiRequest, NextApiResponse} from "next";
import {BaseModel, ModelCollection} from "../../models/base";
import {
    Collection,
    CoursesCollection, DeployCollection, FilesCollection,
    ImagesCollection, NewsCollection, PageCollection,
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

export const hasID = (req: CrudlRequest): boolean => {
    return (req.query as object).hasOwnProperty('id')
}

export const isReadRequest = (req: CrudlRequest): req is ReadRequest => {
    return req.method == "GET" && hasID(req)
}

export interface ListRequest extends CrudBaseRequest {
    method: "GET",
}

export const isListRequest = (req: CrudlRequest): req is ListRequest => {
    return req.method == "GET" && !hasID(req)
}

export interface CreateRequest extends CrudBaseRequest {
    method: "POST",
}

export const isCreateRequest = (req: CrudlRequest): req is CreateRequest => {
    return req.method == "POST" && !hasID(req)
}

export interface UpdateRequest extends CrudBaseRequestWithId {
    method: "PUT",
}

export const isUpdateRequest = (req: CrudlRequest): req is UpdateRequest => {
    return req.method == "PUT" && hasID(req)
}

export interface DeleteRequest extends CrudBaseRequest {
    method: "DELETE",
    query: QueryWithId
}

export const isDeleteRequest = (req: CrudlRequest): req is DeleteRequest => {
    return req.method == "DELETE" && hasID(req)
}

export type CrudlRequest = CreateRequest | ReadRequest | UpdateRequest | DeleteRequest | ListRequest

const jsonError = (res: NextApiResponse) => (e: unknown) => {
    res.status(500)
    console.log(e)
    res.json({error: "Unknown error"})
}

const callAction = <T>(coll: Collection<T>, action: 'onCreate'|'onUpdate'|'onDelete', res: NextApiResponse) => (data: BaseModel<T>): BaseModel<T> => {
    coll[action](data, {refresh: async (url: string) => {
            await res.unstable_revalidate(url)
            console.log("revalidate " + url)
        }})
    return data
}

function ApplyCRUD<T>(coll: Collection<T>, req: CrudlRequest & NextApiRequest, res: NextApiResponse) {
    if(isCreateRequest(req)) {
        coll.post(req.body)
            .then(callAction(coll, 'onCreate', res))
            .then(res.json)
            .catch(jsonError(res))
    }
    else if(isReadRequest(req)) {
        coll.get(req.query.id).then(res.json).catch(jsonError(res))
    }
    else if(isListRequest(req)) {
        coll.list().then(res.json).catch(jsonError(res))
    }
    else if(isUpdateRequest(req)) {
        coll.put(req.body, req.query.id)
            .then(callAction(coll, 'onUpdate', res))
            .then(res.json)
            .catch(jsonError(res))
    }
    else if(isDeleteRequest(req)){
        coll.delete(req.body, req.query.id)
            .then(callAction(coll, 'onDelete', res))
            .then(res.json)
            .catch(jsonError(res))
    }
}

const CrudAPI = async (req: CrudlRequest & NextApiRequest, res: NextApiResponse): Promise<void> => {
    const {query: {collection, secret}} = req;
    switch (collection) {
        case ModelCollection.Courses:
            await ApplyCRUD(CoursesCollection(secret), req, res)
            break;
        case ModelCollection.Races:
            await ApplyCRUD(RaceCollection(secret), req, res)
            break;
        case ModelCollection.Images:
            await ApplyCRUD(ImagesCollection(secret), req, res)
            break;
        case ModelCollection.User:
            await ApplyCRUD(UserCollection(secret), req, res)
            break;
        case ModelCollection.SiteSettings:
            await ApplyCRUD(SiteSettingsCollection(secret), req, res)
            break;
        case ModelCollection.News:
            await ApplyCRUD(NewsCollection(secret), req, res)
            break;
        case ModelCollection.Files:
            await ApplyCRUD(FilesCollection(secret), req, res)
            break;
        case ModelCollection.Deploy:
            await ApplyCRUD(DeployCollection(secret), req, res)
            break;
        case ModelCollection.Page:
            await ApplyCRUD(PageCollection(secret), req, res)
            break;
        default:
            return;
    }
}



export default CrudAPI
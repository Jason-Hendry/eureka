import {RaceData} from "../models/Race";
import {NewsData} from "../models/News";
import {ResultsData} from "../models/Results";
import {UserData} from "../models/User";
import {CourseData} from "../models/Course";
import {SiteSettingData} from "../models/SiteSetting";
import {client, q} from "./faunadb";
import {BaseList, BaseModel, ModelCollection} from "../models/base";
import {FileData} from "../models/File";


export class Collection<T> {
    protected readonly collection: ModelCollection;
    protected readonly secret: string;

    constructor(collection: ModelCollection, secret: string) {
        this.collection = collection;
        this.secret = secret;
    }

    list(): Promise<BaseList<T>> {
        return DocListService<T>(this.collection, this.secret)
    }

    get(id: string): Promise<BaseModel<T>> {
        return DocGetService<T>(this.collection, id, this.secret)
    }

    post(data: T): Promise<BaseModel<T>> {
        return DocPostService<T>(this.collection, data, this.secret)
    }

    put(data: T, id: string): Promise<BaseModel<T>>  {
        return DocPutService<T>(this.collection, data, id, this.secret)
    }
}

export const RaceCollection = (secret: string) => new Collection<RaceData>(ModelCollection.Races, secret)
export const NewsCollection = (secret: string) => new Collection<NewsData>(ModelCollection.News, secret)
export const ResultsCollection = (secret: string) => new Collection<ResultsData>(ModelCollection.Results, secret)
export const UserCollection = (secret: string) => new Collection<UserData>(ModelCollection.User, secret)
export const CoursesCollection = (secret: string) => new Collection<CourseData>(ModelCollection.Courses, secret)
export const ImagesCollection = (secret: string) => new Collection<ImageData>(ModelCollection.Images, secret)
export const SiteSettingsCollection = (secret: string) => new Collection<SiteSettingData>(ModelCollection.SiteSettings, secret)
export const FilesCollection = (secret: string) => new Collection<FileData>(ModelCollection.Files, secret)

export type FaunaDBList<T> = {
    data: FaunaDBItem<T>[];
}
export type FaunaDBItem<T> = {
    ref: { id: string },
    data: T
}



function DocListService<T>(collection: string, secret: string): Promise<BaseList<T>> {
    return new Promise((resolve, reject) => {
        client.query<FaunaDBList<T>>(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index(`all${collection}`)
                    )
                ),
                q.Lambda("x", q.Get(q.Var("x")))
            )
        ).then(({data}) => {

            const mapped: BaseList<T> = data.map(({data, ref: {id}}) => {
                const i: BaseModel<T> = {id, data};
                return i;
            });

            resolve(mapped)
        }).catch((error) => {
            reject({error: error})
        })
    })
}

function DocGetService<T>(collection: string, id: string, secret: string): Promise<BaseModel<T>> {
    return new Promise((resolve, reject) => {
        client.query<FaunaDBItem<T>>(
            q.Get(
                q.Ref(q.Collection(collection), id)
            )
        ).then(({data}) => {
            resolve({id, data})
        }).catch((error) => {
            reject({error: error})
        })
    })
}

function DocPostService<T>(collection: string, data: any, secret: string): Promise<BaseModel<T>> {
    return new Promise((resolve, reject) => {
        client.query<FaunaDBItem<T>>(
            q.Create(
                q.Collection(collection),
                {
                    data,
                }
            )
        ).then(({ref: {id}, data}) => {
            resolve({id, data})
        }).catch((error) => {
            reject({error: error})
        })
    })
}

function DocPutService<T>(collection: string, data: T, id: string, secret: string): Promise<BaseModel<T>> {
    return new Promise((resolve, reject) => {
        client.query<FaunaDBItem<T>>(
            q.Update(
                q.Ref(q.Collection(collection), id),
                {data}
            )
        ).then(({ref: {id}, data}) => {
            resolve({id, data})
        }).catch((error) => {
            reject({error: error})
        })
    })
}


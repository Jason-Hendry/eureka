import {RaceData} from "../models/Race";
import {NewsData} from "../models/News";
import {UserData} from "../models/User";
import {CourseData} from "../models/Course";
import {SiteSettingData} from "../models/SiteSetting";
import {client, q} from "./faunadb";
import {BaseList, BaseModel, ModelCollection} from "../models/base";
import {FileData} from "../models/File";
import {DeployData} from "../models/Deploy";


type Action<T> = (data: T) => void;

export class Collection<T> {
    protected readonly collection: ModelCollection;
    protected readonly secret: string;
    public onCreate: Action<T>
    public onUpdate: Action<T>
    public onDelete: Action<T>

    constructor(collection: ModelCollection, secret: string, actions?: Partial<Record<"create"|"update"|"delete", Action<T>>>) {
        this.collection = collection;
        this.secret = secret;
        this.onCreate = actions?.create || (() => {})
        this.onUpdate = actions?.update || (() => {})
        this.onDelete = actions?.delete || (() => {})
    }

    list(): Promise<BaseList<T>> {
        return DocListService<T>(this.collection)
    }

    get(id: string): Promise<BaseModel<T>> {
        return DocGetService<T>(this.collection, id)
    }

    post(data: T): Promise<BaseModel<T>> {
        return DocPostService<T>(this.collection, data)
    }

    put(data: T, id: string): Promise<BaseModel<T>>  {
        return DocPutService<T>(this.collection, data, id)
    }
    delete(data: T, id: string): Promise<BaseModel<T>>  {
        return DocDeleteService<T>(this.collection, data, id)
    }
}

export const RaceCollection = (secret: string) => new Collection<RaceData>(ModelCollection.Races, secret)
export const NewsCollection = (secret: string) => new Collection<NewsData>(ModelCollection.News, secret)
export const UserCollection = (secret: string) => new Collection<UserData>(ModelCollection.User, secret)
export const CoursesCollection = (secret: string) => new Collection<CourseData>(ModelCollection.Courses, secret)
export const ImagesCollection = (secret: string) => new Collection<ImageData>(ModelCollection.Images, secret)
export const SiteSettingsCollection = (secret: string) => new Collection<SiteSettingData>(ModelCollection.SiteSettings, secret)
export const FilesCollection = (secret: string) => new Collection<FileData>(ModelCollection.Files, secret)
export const DeployCollection = (secret: string) => {
    const Deploy = new Collection<DeployData>(ModelCollection.Deploy, secret)
    Deploy.onCreate = () => {
        if(process.env.DEPLOY) {
            fetch(process.env.DEPLOY)
        }
    }
    return Deploy
}

export type FaunaDBList<T> = {
    data: FaunaDBItem<T>[];
}
export type FaunaDBItem<T> = {
    ref: { id: string },
    data: T
}



function DocListService<T>(collection: string): Promise<BaseList<T>> {
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

function DocGetService<T>(collection: string, id: string): Promise<BaseModel<T>> {
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

function DocPostService<T>(collection: string, data: any): Promise<BaseModel<T>> {
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

function DocPutService<T>(collection: string, data: T, id: string): Promise<BaseModel<T>> {
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

function DocDeleteService<T>(collection: string, data: T, id: string): Promise<BaseModel<T>> {
    return new Promise((resolve, reject) => {
        client.query<FaunaDBItem<T>>(
            q.Delete(
                q.Ref(q.Collection(collection), id),
            )
        ).then(({ref: {id}, data}) => {
            resolve({id, data})
        }).catch((error) => {
            reject({error: error})
        })
    })
}


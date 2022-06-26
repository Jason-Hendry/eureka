import {BaseList, BaseModel} from "../models/base";

export interface CollectionInterface<T> {
    list(): Promise<BaseList<T>>

    get(id: string): Promise<BaseModel<T>>

    post(data: T): Promise<BaseModel<T>>

    put(data: T, id: string): Promise<BaseModel<T>>

    delete(data: T, id: string): Promise<BaseModel<T>>

    findBy(index: string, value: string): Promise<BaseModel<T>>
}
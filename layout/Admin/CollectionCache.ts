import * as React from "react";
import {CollectionAPI} from "../../services/APIService";
import {BaseList, BaseModel} from "../../models/base";
import {CollectionInterface} from "../../services/CollectionInterface";

type CollectionCacheSet<T> = {
    list: Promise<BaseList<T>>|null
}
type CollectionCache = {
    get(key: string): CollectionCacheSet<unknown>
}

export const CollectionCacheProxyBuilder = <T>(realBuilder: (secret: string) => CollectionInterface<T>, cache: CollectionCacheSet<unknown>): (secret: string) => CollectionInterface<T> => {
    return (secret: string): CollectionInterface<T> => {
        return new CollectionCacheProxy(realBuilder(secret), cache as CollectionCacheSet<T>)
    }
}

export class CollectionCacheProxy<T> implements CollectionInterface<T> {

    private _realAPI: CollectionInterface<T>;
    private cache: CollectionCacheSet<T>;

    constructor(realAPI: CollectionInterface<T>, cacheList: CollectionCacheSet<T>) {
        this._realAPI = realAPI;
        this.cache = cacheList;
    }

    delete(data: T, id: string): Promise<BaseModel<T>> {
        return this._realAPI.delete(data, id)
    }

    findBy(index: string, value: string): Promise<BaseModel<T>> {
        return this._realAPI.findBy(index, value)
    }

    get(id: string): Promise<BaseModel<T>> {
        return this._realAPI.get(id)
    }

    list(): Promise<BaseList<T>> {
        if(this.cache.list == null) {
            this.cache.list = this._realAPI.list()
        }
        return this.cache.list
    }

    post(data: T): Promise<BaseModel<T>> {
        return this._realAPI.post(data)
    }

    put(data: T, id: string): Promise<BaseModel<T>> {
        return this._realAPI.put(data, id)
    }
}


function EmptyCache() {
    const cache: Record<string, CollectionCacheSet<unknown>> = {}
    return {
        get: (key: string) => {
            if(!cache[key]) {
                cache[key] = {
                    list: null
                }
            }
            return cache[key]
        }
    };
}

export const CollectionCache = React.createContext<CollectionCache>(EmptyCache())
import {Race, RaceData, RaceList} from "../models/Race";
import {News, NewsData, NewsList} from "../models/News";
import {Results, ResultsData, ResultsList} from "../models/Results";
import {User, UserData, UserList} from "../models/User";
import {Course, CourseData, CourseList} from "../models/Course";
import React from "react";
import {Image, ImageList, ImageData} from "../models/Image";

export function DocListRaces(secret: string) :Promise<RaceList> {
    return DocListService<RaceList>("Races", secret)
}
export function DocListNews(secret: string) :Promise<NewsList> {
    return DocListService<NewsList>("News", secret)
}
export function DocListResults(secret: string) :Promise<ResultsList> {
    return DocListService<ResultsList>("Results", secret)
}
export function DocListUsers(secret: string) :Promise<UserList> {
    return DocListService<UserList>("User", secret)
}
export function DocListCourses(secret: string) :Promise<CourseList> {
    return DocListService<CourseList>("Courses", secret)
}

function DocListService<T>(collection, secret): Promise<T> {
    return new Promise((resolve, reject) => {
        console.log(`Fetching: /api/${ collection }?secret=${ secret }`)
        fetch(`/api/${ collection }?secret=${ secret }`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => <T><unknown>res.json())
            .then((result: T) => resolve(result))
            .catch(error => reject(error))
    })
}

export function DocGetRaces(id, secret) :Promise<Race> {
    return DocGetService<Race>("Races", id, secret)
}
export function DocGetNews(id, secret) :Promise<News> {
    return DocGetService<News>("News", id, secret)
}
export function DocGetResults(id, secret) :Promise<Results> {
    return DocGetService<Results>("Results", id, secret)
}
export function DocGetUser(id, secret) :Promise<User> {
    return DocGetService<User>("User", id, secret)
}
export function DocGetCourse(id, secret) :Promise<Course> {
    return DocGetService<Course>("Courses", id, secret)
}


function DocGetService<T>(collection, id, secret): Promise<T> {
    return new Promise((resolve, reject) => {
        console.log(`Fetching: /api/${ collection }/${ id }?secret=${ secret }`)
        fetch(`/api/${ collection }/${ id }?secret=${ secret }`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => <T><unknown>res.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

export function DocPostRaces(data: RaceData, secret) :Promise<Race> {
    return DocPostService<Race>("Races", data, secret)
}
export function DocPostNews(data: NewsData, secret) :Promise<News> {
    return DocPostService<News>("News", data, secret)
}
export function DocPostResults(data: ResultsData, secret) :Promise<Results> {
    return DocPostService<Results>("Results", data, secret)
}
export function DocPostUser(data: UserData, secret) :Promise<User> {
    return DocPostService<User>("User", data, secret)
}
export function DocPostImages(data: ImageData, secret) :Promise<Image> {
    return DocPostService<Image>("Images", data, secret)
}
export function DocPostCourse(data: CourseData, secret) :Promise<Course> {
    return DocPostService<Course>("Courses", data, secret)
}

function DocPostService<T>(collection: string, data: any, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(`/api/${collection}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({secret, ...data})
        })
            .then(res => <T><unknown>res.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

export function DocPutRaces(data: RaceData, id: string, secret: string) :Promise<Race> {
    return DocPutService<Race>("Races", data, id, secret)
}
export function DocPutNews(data: NewsData, id: string, secret: string) :Promise<News> {
    return DocPutService<News>("News", data, id, secret)
}
export function DocPutResults(data: ResultsData, id: string, secret: string) :Promise<Results> {
    return DocPutService<Results>("Results", data, id, secret)
}
export function DocPutUser(data: UserData, id: string, secret: string) :Promise<User> {
    return DocPutService<User>("User", data, id, secret)
}
export function DocPutCourse(data: CourseData, id: string, secret: string) :Promise<Course> {
    return DocPutService<Results>("Courses", data, id, secret)
}

function DocPutService<T>(collection: string, data: object, id: string, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {


        fetch(`/api/${collection}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({secret, ...data})
        })
            .then(res => <T><unknown>res.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}


export const RaceFetcher = url => fetch(url).then(r => <Race><unknown>r.json())
export const RaceListFetcher = url => fetch(url).then(r => <RaceList><unknown>r.json())
export const ResultsFetcher = url => fetch(url).then(r => <Results><unknown>r.json())
export const ResultsListFetcher = url => fetch(url).then(r => <ResultsList><unknown>r.json())
export const CourseFetcher = url => fetch(url).then(r => <Course><unknown>r.json())
export const CourseListFetcher = url => fetch(url).then(r => <CourseList><unknown>r.json())
export const UserFetcher = url => fetch(url).then(r => <User><unknown>r.json())
export const UserListFetcher = url => fetch(url).then(r => <UserList><unknown>r.json())
export const NewsFetcher = url => fetch(url).then(r => <News><unknown>r.json())
export const NewsListFetcher = url => fetch(url).then(r => <NewsList><unknown>r.json())
export const ImageListFetcher = url => fetch(url).then(r => <ImageList><unknown>r.json())

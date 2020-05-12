import {DocGetNews, DocListNews} from "../../services/DirectService";
import React from "react";
import {ISODateToPretty} from "../../services/dates";
import PublicLayout from "../../layouts/public";
import {NewsData} from "../../models/News";

interface Props {
    news: NewsData
}

export default function News({news: {Title, Teaser, Date, Body}}: Props) {
    const niceDate = ISODateToPretty(Date)
    const leadP = `${niceDate} - ${Teaser}`
    return <PublicLayout small={true} title={Title} heroImage={require("assets/img/bg3.jpg")} leadParagraph={leadP}>{Body}</PublicLayout>
}

export async function getStaticProps({params: {news}}): Promise<{ props: Props }> {
    const newsArticle = await DocGetNews(news, process.env.FAUNADB_SECRET)
    console.log({props: {news: newsArticle.data}})
    return {props: {news: newsArticle.data}}
}

export async function getStaticPaths() {
    const paths = (await DocListNews(process.env.FAUNADB_SECRET)).filter(n => {
        // console.log(n.data.Date)
        return (n.data.Date || false) !== false
    }).map(n => {
        return {params: {news: n.id}}
    })
    return {
        paths,
        fallback: false
    }
}

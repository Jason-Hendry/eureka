import {PageObject, SubPageObject} from "./PageObject";

export class News extends PageObject {
    public clickAddNewArticle = () => new NewArticleForm(this.clickContainsText("Add New Article"))
    public findNews = (news: string) => new NewsListItem(this.findRowWithCell(news))
}

export class NewsListItem extends SubPageObject {
    public clickEdit() { return new NewArticleForm(super.clickEdit()) }
}

export class NewArticleForm extends PageObject {
    public enterTitle = (name: string) => this.enterTextField(/title/i, name)
    public enterTeaser = (email: string) => this.enterTextField(/teaser/i, email)
    public enterContent = (email: string) => this.enterTextField(/content/i, email)
    public enterNewsDate = (email: string) => this.enterTextField(/news date/i, email)
    public clickCreate = () => this.clickSelector('button[type=submit]')
    public clickDelete = () => this.clickContainsText('Delete')
}


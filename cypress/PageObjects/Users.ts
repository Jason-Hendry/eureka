import {PageObject, SubPageObject} from "./PageObject";

export class Users extends PageObject {
    public clickAddNewUser = () => new NewUserForm(this.clickContainsText("Add New User"))
    public findUser = (user: string) => new UsersListItem(this.findRowWithCell(user))
}

export class UsersListItem extends SubPageObject {
    public clickEdit() { return new NewUserForm(super.clickEdit()) }
}

export class NewUserForm extends PageObject {
    public enterName = (name: string) => this.enterTextField(/name/i, name)
    public enterEmail = (email: string) => this.enterTextField(/email/i, email)
    public clickCreate = () => this.clickSelector('button[type=submit]')
    public clickDelete = () => this.clickContainsText('Delete')
}


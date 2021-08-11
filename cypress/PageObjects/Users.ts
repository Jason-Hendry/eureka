import {PageObject} from "./PageObject";

export class Users extends PageObject {
    public clickAddNewUser = () => new NewUserForm(this.clickContainsText("Add New User"))
}

export class NewUserForm extends PageObject {
    public enterName = (name: string) => this.enterTextField(/name/i, name)
    public enterEmail = (email: string) => this.enterTextField(/email/i, email)
    public clickCreate = () => this.clickSelector('button[type=submit]')
}


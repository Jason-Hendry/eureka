import {PageObject} from "./PageObject";

export class Courses extends PageObject {
    public clickAddNewCourse = () => new NewCourseForm(this.clickContainsText("Add New Course"))
}

export class NewCourseForm extends PageObject {
    public enterTitle = (name: string) => this.enterTextField(/title/i, name)
    public clickCreate = () => this.clickSelector('button[type=submit]')
}


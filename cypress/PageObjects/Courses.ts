import {PageObject, SubPageObject} from "./PageObject";

export class Courses extends PageObject {
    public clickAddNewCourse = () => new NewCourseForm(this.clickContainsText("Add New Course"))
    public findCourse = (course: string) => new CourseListItem(this.findRowWithCell(course))

}

export class CourseListItem extends SubPageObject {
    public clickEdit() { return new NewCourseForm(super.clickEdit()) }
}

export class NewCourseForm extends PageObject {
    public enterTitle = (name: string) => this.enterTextField(/title/i, name)
    public clickCreate = () => this.clickSelector('button[type=submit]')
    public clickDelete = () => this.clickContainsText('Delete')
}


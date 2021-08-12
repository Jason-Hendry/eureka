import {LoginAsAdmin} from "../../PageObjects/Login";

describe('Course', () => {
    const newCourseName = "Test Course"

    it('should be created', () => {
        LoginAsAdmin()
            .openMenu()
            .clickCourses()
            .clickAddNewCourse()
            .enterTitle(newCourseName)
            .clickCreate()
    });

    it('should be deleted', () => {
        LoginAsAdmin()
            .openMenu()
            .clickCourses()
            .findCourse(newCourseName)
            .clickEdit()
            .clickDelete()
    });
});
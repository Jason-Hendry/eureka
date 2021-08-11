import {LoginAsAdmin} from "../../PageObjects/Login";

describe('Login', () => {
    it('should create course', () => {
        LoginAsAdmin()
            .openMenu()
            .clickCourses()
            .clickAddNewCourse()
            .enterTitle("Test Course")
            .clickCreate()
    });
});
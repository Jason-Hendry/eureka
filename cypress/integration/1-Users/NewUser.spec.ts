import {LoginAsAdmin} from "../../PageObjects/Login";

describe('Login', () => {
    it('should Login', () => {
        LoginAsAdmin()
            .openMenu()
            .clickUsers()
            .clickAddNewUser()
            .enterName("Test User")
            .enterEmail("eurekacycling-test@mailinator.com")
            .clickCreate()
    });
});
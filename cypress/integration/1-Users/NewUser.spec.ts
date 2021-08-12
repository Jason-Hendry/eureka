import {LoginAsAdmin} from "../../PageObjects/Login";

describe('User', () => {
    const newUserName = "Test User"

    it('should be created', () => {
        LoginAsAdmin()
            .openMenu()
            .clickUsers()
            .clickAddNewUser()
            .enterName(newUserName)
            .enterEmail("eurekacycling-test@mailinator.com")
            .clickCreate()
    });

    it('should be deleted', () => {
        LoginAsAdmin()
            .openMenu()
            .clickUsers()
            .findUser(newUserName)
            // .findUser('jason+test+1@rain.com.au')
            .clickEdit()
            .clickDelete()
    });
});
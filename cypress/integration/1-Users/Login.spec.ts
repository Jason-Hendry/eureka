import {GoToLogin} from "../../PageObjects/Login";

describe('Login', () => {
    it('should Login', () => {
        GoToLogin()
            .enterEmail(Cypress.env('admin_email') || "")
            .enterPassword(Cypress.env('admin_password') || "")
            .clickLoginButton()
            .shouldGoToAdminPage()
    });
});
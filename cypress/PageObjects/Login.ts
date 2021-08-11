import {PageObject} from "./PageObject";
import {Admin, ADMIN_PATH} from "./Admin";

export class Login extends PageObject {
    public enterEmail = (username: string) => this.enterTextField(/email/i, username)
    public enterPassword = (password: string) => this.enterTextField(/password/i, password)
    public clickLoginButton = () => this.clickSelector('button[type=submit]')
    public shouldGoToAdminPage = () => new Admin(cy.url().should('equal', Cypress.config('baseUrl')+ADMIN_PATH))
}

const LOGIN_PATH = "login";
export const GoToLogin = () => new Login(cy.visit(LOGIN_PATH))


export const LoginAsAdmin = () => {
    return GoToLogin()
        .enterEmail(Cypress.env('admin_email') || "")
        .enterPassword(Cypress.env('admin_password') || "")
        .clickLoginButton()
        .shouldGoToAdminPage()
}
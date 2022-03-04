import {PageObject} from "./PageObject";
import {Admin, ADMIN_PATH} from "./Admin";

export class Login extends PageObject {
    public enterEmail = (username: string) => this.enterTextField(/email/i, username)
    public enterPassword = (password: string) => this.enterTextField(/password/i, password)
    public clickLoginButton = () => this.clickSelector('button[type=submit]')
    public shouldGoToAdminPage = () => new Admin(cy.url({timeout: 8000}).should('equal', Cypress.config('baseUrl')+ADMIN_PATH))
}

const LOGIN_PATH = "login";
export const GoToLogin = () => new Login(cy.visit(LOGIN_PATH))
export const GoToSite = () => new Site(cy.visit("/"))

export class Site extends PageObject {
    mainMenu = () => new MainMenu("")
}
export class MainMenu extends PageObject {
    clickAnnouncentsRaceReport = () => new RaceReport(this.clickContainsText("Announcements and Race Reports"))
    clickCalendar = () => new RaceReport(this.clickContainsText("Calendar"))
    clickResults = () => new RaceReport(this.clickContainsText("Results"))
    clickCovidSafe = () => new RaceReport(this.clickContainsText("Covid Safe"))
    clickJoin = () => new RaceReport(this.clickContainsText("Join"))
}
export class RaceReport extends Site {
}

export const LoginAsAdmin = () => {
    return GoToLogin()
        .enterEmail(Cypress.env('admin_email') || "")
        .enterPassword(Cypress.env('admin_password') || "")
        .clickLoginButton()
        .shouldGoToAdminPage()
}
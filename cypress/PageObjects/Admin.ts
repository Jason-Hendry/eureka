import {PageObject, SubPageObject} from "./PageObject";
import {Users} from "./Users";
import {Courses} from "./Courses";
import {News} from "./News";
import {Races} from "./Race";

export class Admin extends PageObject {
    public openMenu = () => {
        cy.findByTitle('Menu').click();
        return new AdminMenu(cy.findByRole('menu'))
    }
}
export class AdminMenu extends SubPageObject {
    public clickRaces = () => {
        this.row.find(':contains(Races)').click()
        return new Races(this.shouldSeeHeader('2021 Races'))
    }
    public clickUsers = () => new Users(this.clickContainsTextAndSeeHeader('Users', 'Users'))
    public clickCourses = () => new Courses(this.clickContainsTextAndSeeHeader('Courses', 'Courses'))
    public clickNews = () => new News(this.clickContainsTextAndSeeHeader('News', 'News'))
}

export const GoToAdmin = () => new Admin(cy.visit(ADMIN_PATH))

export const ADMIN_PATH = "admin";
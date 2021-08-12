import {PageObject} from "./PageObject";
import {Users} from "./Users";
import {Courses} from "./Courses";
import {News} from "./News";

export class Admin extends PageObject {
    public openMenu = () => new AdminMenu(cy.findByTitle('Menu').click())
}
export class AdminMenu extends PageObject {
    public clickRaces = () => this.clickContainsTextAndSeeHeader('Races', 'Races')
    public clickUsers = () => new Users(this.clickContainsTextAndSeeHeader('Users', 'Users'))
    public clickCourses = () => new Courses(this.clickContainsTextAndSeeHeader('Courses', 'Courses'))
    public clickNews = () => new News(this.clickContainsTextAndSeeHeader('News', 'News'))
}

export const GoToAdmin = () => new Admin(cy.visit(ADMIN_PATH))

export const ADMIN_PATH = "admin";
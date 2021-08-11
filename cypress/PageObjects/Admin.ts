import {PageObject} from "./PageObject";
import {Users} from "./Users";
import {Courses} from "./Courses";

export class Admin extends PageObject {
    public openMenu = () => new AdminMenu(cy.findByTitle('Menu').click())
}
export class AdminMenu extends PageObject {
    public clickRaces = () => this.clickContainsText('Races')
    public clickUsers = () => new Users(this.clickContainsText('Users'))
    public clickCourses = () => new Courses(this.clickContainsText('Courses'))
}

export const GoToAdmin = () => new Admin(cy.visit(ADMIN_PATH))

export const ADMIN_PATH = "admin";
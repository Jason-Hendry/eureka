import {PageObject, SubPageObject} from "./PageObject";

export class Races extends PageObject {
    public clickAddNewRace = () => new NewRaceForm(this.clickContainsText("Add New Race"))
    public findRace = (race: string) => new RacesListItem(this.findRowWithCell(race))
}

export class RacesListItem extends SubPageObject {
    public clickEdit() { return new NewRaceForm(super.clickEdit()) }
}

export class NewRaceForm extends PageObject {
    public enterDate = (name: string) => this.enterTextField(/race date/i, name)
    public enterTitle = (email: string) => this.enterTextField(/title/i, email)
    public clickCreate = () => this.clickSelector('button[type=submit]')
    public clickDelete = () => this.clickContainsText('Delete')
}


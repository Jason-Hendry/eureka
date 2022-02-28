import {PageObject, SubPageObject} from "./PageObject";

export class Races extends PageObject {
    public clickAddNewRace = () => new NewRaceForm(this.clickContainsText("Add New Race"))
    public clickShowPreviousRaces = () => this.wrap(this.clickContainsText("Hide Past Events"))
    public clickResultsFor = (name: string) => {
        return new ResultsForm(cy.contains(name).parent().contains("Results").click())
    }
    public findRace = (race: string) => new RacesListItem(this.findRowWithCell(race))
}

export class RacesListItem extends SubPageObject {
    public clickEdit() { return new NewRaceForm(super.clickEdit()) }
}

export class NewRaceForm extends PageObject {
    public enterDate = (name: string) => this.enterTextField(/race date/i, name)
    public enterTitle = (email: string) => this.enterTextField(/title/i, email)
    public clickCreate = () => this.clickSelector('button[type=submit]')
    public clickSave = () => this.clickSelector('button[type=submit]')
    public clickDelete = () => this.clickContainsText('Delete')
}

export class ResultsForm extends PageObject {
    public enterRider = (pos: number, name: string) => this.wrap(cy.get("#rider"+(pos-1)).type(name))
    public clickSave = () => this.clickSelector('button[type=submit]')
}


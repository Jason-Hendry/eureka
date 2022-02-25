import {LoginAsAdmin} from "../../PageObjects/Login";
import {thisYear} from "../../PageObjects/Admin";

describe('Race', () => {
    const newRaceName = "Test Race"

    it('should be created', () => {
        LoginAsAdmin()
            .openMenu()
            .clickRaces()
            .clickAddNewRace()
            .enterTitle(newRaceName)
            .enterDate(`${thisYear}-12-12`)
            .clickCreate()
    });

    it('should be deleted', () => {
        LoginAsAdmin()
            .openMenu()
            .clickRaces()
            .findRace(newRaceName)
            .clickEdit()
            .clickDelete()
    });
});
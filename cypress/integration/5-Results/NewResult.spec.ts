import {LoginAsAdmin} from "../../PageObjects/Login";
import {thisYear} from "../../PageObjects/Admin";

describe('Race', () => {
    const newRaceName = "Test Race"

    it('should be created', () => {
        LoginAsAdmin()
            .openMenu()
            .clickRaces()
            .clickShowPreviousRaces()
            .clickResultsFor(newRaceName)
            .enterRider(1, "Jason Hendry")
            // .enterTitle(newRaceName)
            // .clickSave()
    });
});
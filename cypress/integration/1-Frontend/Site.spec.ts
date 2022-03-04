import {GoToSite} from "../../PageObjects/Login";

describe('Site', () => {
    it('should render all main pages', () => {
        GoToSite()
            .mainMenu()
            .clickAnnouncentsRaceReport()
            .mainMenu()
            .clickCalendar()
            .mainMenu()
            .clickResults()
            .mainMenu()
            .clickCovidSafe()
            .mainMenu()
            .clickJoin()
    });
});
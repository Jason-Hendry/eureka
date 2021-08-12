import {LoginAsAdmin} from "../../PageObjects/Login";

describe('News', () => {
    const newNewsName = "Test News"

    xit('should be created', () => {
        LoginAsAdmin()
            .openMenu()
            .clickNews()
            .clickAddNewArticle()
            .enterTitle(newNewsName)
            .clickCreate()
    });

    it('should be deleted', () => {
        LoginAsAdmin()
            .openMenu()
            .clickNews()
            // .findNews(newNewsName)
            .findNews('Website News')
            .clickEdit()
            .clickDelete()
    });
});
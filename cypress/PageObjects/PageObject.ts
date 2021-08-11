

export class PageObject {
    // noinspection JSUnusedLocalSymbols - For convience to allow constructor to contain cy commands e.g Login(cy.visit('/login'))
    constructor(data?: unknown) {}
    // noinspection JSUnusedLocalSymbols - For convience to allow method to contain cy commands e.g this.wrap(cy.get('button').click)
    protected wrap(data?: unknown) {
        return this;
    }
    protected goTo(path: string) {
        return this.wrap(cy.visit(path))
    }
    protected enterTextField(field: RegExp, text: string) {
        return this.wrap(cy.findByLabelText(field).type(text))
    }
    protected clickSelector(selector: Parameters<typeof cy.get>[0], options?: Parameters<typeof cy.get>[1]) {
        return this.wrap(cy.get(selector, options).click())
    }
    protected clickContainsText(text: string) {
        return this.wrap(cy.contains(text).click())
    }
}


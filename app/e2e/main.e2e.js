describe('Skillhunt app', () => {

    beforeEach(() => {
        browser.get('#');
    });

    it('should have a title', () => {
        expect(browser.getTitle()).toEqual('Bookshelf');
    });

    it('should be on main page', () => {
        expect(browser.getCurrentUrl()).toMatch('(#!/main)$');
    });
});

describe('Version 2 hackathon app', () => {
    let logo;
    let headerEl;
    let formGroup;
    let userNameField;
    let passwordField;
    let loginBtn;
    let rememberMeCheckbox;
    let rememberMeLabel;
    let socialMediaIcons;

    it('Initialize elements', async () => {
        browser.waitForAngularEnabled(false);
        await browser.get('https://demo.applitools.com/hackathonV2.html');
        logo = await element(by.css('.logo-w img'));
        headerEl = await element(by.className('auth-header'));
        formGroup = element.all(by.className('form-group'));
        userNameField = await element(by.id('username'));
        passwordField = await element(by.id('password'));
        loginBtn = await element(by.partialButtonText('Log In'));
        rememberMeCheckbox = await element(by.className('form-check-input'));
        rememberMeLabel = await element(by.className('form-check-label'));
        socialMediaIcons = element.all(by.css('form img'));
    });

    it('test ui elements', async () => {
        expect(logo.isDisplayed()).toBe(true, 'Logo image is not displayed');
        expect(headerEl.getText()).toContain('Logout Form', 'Header text is not correct');
        expect(formGroup.first().element(by.tagName('label')).getText()).toEqual('Username', 'Username label is not correct');
        expect(userNameField.getAttribute('placeholder')).toContain('John Smith', 'Username field placeholder is not correct');
        expect(formGroup.last().element(by.tagName('label')).getText()).toEqual('Pwd', 'Password label is not correct');
        expect(passwordField.getAttribute('placeholder')).toContain('ABC$*1@', 'Password field placeholder is not correct');
        expect(loginBtn.isDisplayed()).toBe(true, 'Login button is NOT visible');
        expect(rememberMeCheckbox.isDisplayed()).toBe(true, 'Remember me checkbox is NOT visible');
        expect(rememberMeLabel.getText()).toContain('Remember Me', 'Remember me label is not correct');
        expect(socialMediaIcons.count()).toEqual(2, 'Social media icons count is not correct');
    });
});
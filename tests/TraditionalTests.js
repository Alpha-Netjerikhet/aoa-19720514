describe('Version 1 hackathon app', () => {

    it('test 1', async () => {
        browser.waitForAngularEnabled(false);
        await browser.get('https://demo.applitools.com/hackathon.html');
        // await browser.get('https://demo.applitools.com/hackathonV2.html');
        let logo = element(by.css('.logo-w img'));
        let headerEl = await element(by.className('auth-header'));
        let formGroup = element.all(by.className('form-group'));
        let userNameField = await element(by.id('username'));
        let passwordField = await element(by.id('password'));
        let loginBtn = element(by.partialButtonText('Log In'));
        let userIcon = element(by.className('os-icon-user-male-circle'));
        let fingerprintIcon = element(by.className('os-icon-fingerprint'));
        let rememberMeCheckbox = element(by.className('form-check-input'));
        let rememberMeLabel = element(by.className('form-check-label'));
        let socialMediaIcons = element.all(by.css('form img'));
        expect(logo.isDisplayed()).toBe(true, 'Logo image is not displayed');
        expect(headerEl.getText()).toContain('Login Form', 'Header text is not correct');
        expect(formGroup.first().element(by.tagName('label')).getText()).toEqual('Username', 'Username label is not correct');
        expect(userIcon.isDisplayed()).toBe(true, 'User icon is NOT visible');
        expect(userNameField.getAttribute('placeholder')).toContain('Enter your username', 'Username field placeholder is not correct');
        expect(formGroup.last().element(by.tagName('label')).getText()).toEqual('Password', 'Password label is not correct');
        expect(passwordField.getAttribute('placeholder')).toContain('Enter your password', 'Password field placeholder is not correct');
        expect(fingerprintIcon.isDisplayed()).toBe(true, 'Fingerprint icon is NOT visible');
        expect(loginBtn.isDisplayed()).toBe(true, 'Login button is NOT visible');
        expect(rememberMeCheckbox.isDisplayed()).toBe(true, 'Remember me checkbox is NOT visible');
        expect(rememberMeLabel.getText()).toContain('Remember Me', 'Remember me label is not correct');
        expect(socialMediaIcons.count()).toEqual(3, 'Social media icons count is not correct');
    });
});
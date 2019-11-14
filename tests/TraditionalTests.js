describe('Version 1 hackathon app', () => {
    let logo;
    let headerEl;
    let formGroup;
    let userNameField;
    let passwordField;
    let loginBtn;
    let userIcon;
    let fingerprintIcon;
    let rememberMeCheckbox;
    let rememberMeLabel;
    let socialMediaIcons;
    let alertWarning;
    let loggedUser;
    let transactionsTable;
    let amountColumnHeader;
    const isSorted = async (actualAmounts) => {
        let isSorted = true;
        for (let i = 0; i < actualAmounts.length - 1; i++) {
            let el1 = await actualAmounts[i].replace(',', '').replace('+ ', '+').replace('- ', '-');
            let el2 = await actualAmounts[i + 1].replace(',', '').replace('+ ', '+').replace('- ', '-');
            if (parseFloat(el1) > parseFloat(el2)) {
                isSorted = false;
                break;
            }
        }
        return isSorted;
    };

    it('Initialize elements', async () => {
        browser.waitForAngularEnabled(false);
        await browser.get('https://demo.applitools.com/hackathon.html');
        // await browser.get('https://demo.applitools.com/hackathonV2.html');
        logo = await element(by.css('.logo-w img'));
        headerEl = await element(by.className('auth-header'));
        formGroup = element.all(by.className('form-group'));
        userNameField = await element(by.id('username'));
        passwordField = await element(by.id('password'));
        loginBtn = await element(by.partialButtonText('Log In'));
        userIcon = await element(by.className('os-icon-user-male-circle'));
        fingerprintIcon = await element(by.className('os-icon-fingerprint'));
        rememberMeCheckbox = await element(by.className('form-check-input'));
        rememberMeLabel = await element(by.className('form-check-label'));
        socialMediaIcons = element.all(by.css('form img'));
    });

    it('Login Page UI Elements Test', async () => {
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

    it('Data-Driven Test', async () => {
        await loginBtn.click();
        alertWarning = await element(by.className('alert alert-warning'));
        expect(alertWarning.getText()).toContain('Both Username and Password must be present', 'Alert text is not displayed properly when both username and password are missing');
        await userNameField.sendKeys('user');
        await loginBtn.click();
        expect(alertWarning.getText()).toContain('Password must be present', 'Alert text is not displayed properly when password is missing');
        await userNameField.clear();
        await passwordField.sendKeys('password');
        await loginBtn.click();
        expect(alertWarning.getText()).toContain('Username must be present', 'Alert text is not displayed properly when username is missing');
        await userNameField.sendKeys('user');
        await loginBtn.click();
        loggedUser = await element(by.css('.top-bar .logged-user-w'));
        expect(loggedUser.isDisplayed()).toBe(true, 'Logged user info is NOT visible');
    });

    it('Table Sort Test', async () => {
        transactionsTable = await element(by.css('#transactionsTable'));
        amountColumnHeader = await element(by.css('#amount'));
        expect(transactionsTable.isDisplayed()).toBe(true, 'Transactions table is NOT displayed');

        await amountColumnHeader.click();
        await browser.sleep(2000);
        // actual amounts after sort
        const actualAmountsAfterSort = await element.all(by.css('#transactionsTable tbody tr td:nth-child(5)')).getText();
        expect(isSorted(actualAmountsAfterSort)).toBe(true, 'Amounts are NOT sorted in ascending order');
    });
});
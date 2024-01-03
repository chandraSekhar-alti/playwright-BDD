const { When, Then, Given } = require("@cucumber/cucumber");
const { LoginPage } = require("../page/loginpage");
// const { setDefaultTimeout } = require('@cucumber/cucumber');
let loginPage = new LoginPage();

Given(/^I am on the OrangeHRM Login page$/, async () => {
  await loginPage.navigate(process.env.WEB_URL);
});

Then(/^I verified the OrangeHRM Login page$/, async () => {
  await loginPage.loginPageValidation();
  await loginPage.copyRightSectionValidation();
  await loginPage.socialMediaIconsValidation();
});

When(/^I login OrangeHRM with (.*) and (.*)$/, async (uname, upassword) => {
  await loginPage.loginToWebsite(uname, upassword);
});

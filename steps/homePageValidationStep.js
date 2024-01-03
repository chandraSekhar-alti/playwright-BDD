const { When, Then, Given } = require("@cucumber/cucumber");
const { LoginPage } = require("../page/homePage");
let loginPage = new LoginPage();

Given(/^I navigate to the OrangeHRM login page$/, async () => {
  await loginPage.navigate(process.env.WEB_URL);
});

Then(/^I verify the OrangeHRM login page$/, async () => {
  await loginPage.loginPageValidation();
  await loginPage.copyRightSectionValidation();
  await loginPage.socialMediaIconsValidation();
});

When(
  /^I log in to OrangeHRM with username (.*) and password (.*)$/,
  async (uname, upassword) => {
    await loginPage.loginToWebsite(uname, upassword);
  }
);

Then(/^I verify the Home page of OrangeHRM$/, async () => {
  await loginPage.homePageValidation();
});

Then(/^I verify the side panel on the Home page$/, async () => {
  await loginPage.sideItemsValidation();
});

const { expect } = require("@playwright/test");
const path = require("path");
const data = require("../testData/homePageValidation.json");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

class LoginPage {
  userNameInput() {
    return global.page.locator('//input[@name="username"]');
  }
  userPasswordField() {
    return global.page.locator('//input[@type="password"]');
  }
  submitButton() {
    return global.page.locator('//button[@type="submit"]');
  }
  orangeHrmCompanyBrandingImage() {
    return global.page.locator('//img[@alt="company-branding"]');
  }
  loginCenterText() {
    return global.page.locator('//h5[text()="Login"]');
  }
  orangeHrmLogo() {
    return global.page.locator('(//img[@alt="orangehrm-logo"])[2]');
  }
  forgotPasswordtext() {
    return global.page.locator('//div[@class="orangehrm-login-forgot"]/p');
  }
  copyRightContainer() {
    return global.page.locator('//div[@class="orangehrm-copyright-wrapper"]');
  }
  orangeHrmOSversionText() {
    return global.page.locator(
      '(//div[@class="orangehrm-copyright-wrapper"]/p)[1]'
    );
  }
  orangeHrmAllRightsText() {
    return global.page.locator(
      '(//div[@class="orangehrm-copyright-wrapper"]/p)[2]'
    );
  }
  orangeHrmLinkedInLogo() {
    return global.page.locator(
      '(//div[@class="orangehrm-login-footer-sm"]/a)[1]'
    );
  }
  orangeHrmFaceBookLogo() {
    return global.page.locator(
      '(//div[@class="orangehrm-login-footer-sm"]/a)[2]'
    );
  }
  orangeHrmTwitterLogo() {
    return global.page.locator(
      '(//div[@class="orangehrm-login-footer-sm"]/a)[3]'
    );
  }
  orangeHrmYoutubeLogo() {
    return global.page.locator(
      '(//div[@class="orangehrm-login-footer-sm"]/a)[4]'
    );
  }
  orangeHRMBrandBanner() {
    return global.page.locator('//img[@alt="client brand banner"]');
  }
  dashBoardName() {
    return global.page.locator('//h6[text()="Dashboard"]');
  }
  userDropDown() {
    return global.page.locator('//li[@class="oxd-userdropdown"]');
  }
  sidePannelItems(text) {
    return global.page.locator(
      `//a[@class="oxd-main-menu-item"]/span[text()="${text}"]`
    );
  }
  maintancePageCancelButton() {
    return global.page.locator('//button[text()=" Cancel "]');
  }

  async navigate(url) {
    await global.page.goto(url);
    await page.waitForTimeout(5000);
  }

  async loginPageValidation() {
    page.waitForTimeout(5000);
    // expect(await this.orangeHrmCompanyBrandingImage(), {
    //   timeout: 10000,
    // }).toBeVisible();
    await expect(this.loginCenterText()).toBeVisible();
    await expect(this.orangeHrmLogo()).toBeVisible();
    await expect(this.forgotPasswordtext()).toBeVisible();
    const actualText = await this.forgotPasswordtext().innerText();
    console.log("actualText :- ", actualText);
    const expectedTexts = ["Forgot Your Password?", "Forgot your password?"];
    expect(expectedTexts.includes(actualText)).toBe(true);
  }

  async copyRightSectionValidation() {
    await expect(this.copyRightContainer()).toBeVisible();
    await expect(this.orangeHrmOSversionText()).toBeVisible();
    await expect(this.orangeHrmOSversionText()).toHaveText(/OrangeHRM OS 5.5/);
    await expect(this.orangeHrmAllRightsText()).toBeVisible();
  }
  async socialMediaIconsValidation() {
    await expect(this.orangeHrmLinkedInLogo()).toBeVisible();
    await expect(this.orangeHrmFaceBookLogo()).toBeVisible();
    await expect(this.orangeHrmTwitterLogo()).toBeVisible();
    await expect(this.orangeHrmYoutubeLogo()).toBeVisible();
  }

  async loginToWebsite(userName, userPassword) {
    await this.userNameInput().waitFor({ status: "visible" });
    await this.userNameInput().fill(userName);
    await this.userPasswordField().fill(userPassword);
    await this.submitButton().click();
    await page.waitForTimeout(5000);
    expect(await global.page.url()).toEqual(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  }

  async homePageValidation() {
    await expect(this.orangeHRMBrandBanner()).toBeVisible();
    await expect(this.dashBoardName()).toBeVisible();
    await expect(this.userDropDown()).toBeVisible();
    await expect(page).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  }

  async sideItemsValidation() {
    for (const listItem of data.sidePannelListItems) {
      if (listItem == "Maintenance") {
        await this.sidePannelItems(listItem).hover();
        await page.waitForTimeout(500);
        await expect(this.sidePannelItems(listItem)).toBeVisible();
        await this.sidePannelItems(listItem).click();
        await page.waitForTimeout(1000);
        await this.maintancePageCancelButton().click();
      } else {
        await this.sidePannelItems(listItem).hover();
        await page.waitForTimeout(500);
        await expect(this.sidePannelItems(listItem)).toBeVisible();
        await this.sidePannelItems(listItem).click();
        await page.waitForTimeout(1000);
      }
    }
  }
}
module.exports = {
  LoginPage,
};

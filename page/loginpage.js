const { expect } = require("@playwright/test");
const exp = require("constants");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

class LoginPage {
  userNameInput() {
    return global.page.locator('//input[@placeholder="Username"]');
  }
  userPasswordField() {
    return global.page.locator('//input[@placeholder="Password"]');
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

  async navigate(url) {
    await global.page.goto(url);
    await page.waitForTimeout(5000);
  }

  async loginPageValidation() {
    expect(await this.orangeHrmCompanyBrandingImage()).toBeVisible();
    expect(await this.loginCenterText()).toBeVisible();
    expect(await this.orangeHrmLogo()).toBeVisible();
    expect(await this.forgotPasswordtext()).toBeVisible();
    expect(await this.forgotPasswordtext()).toHaveText(/Forgot your password?/);
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
    await page.waitForTimeout(5000)
    expect(await global.page.url()).toEqual(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  }
}
module.exports = {
  LoginPage,
};

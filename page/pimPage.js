const { expect } = require("@playwright/test");
const { path } = require("path");
// const utile = require("../utility/orangeHRM_utile.js").default;
const data = require("../testData/homePageValidation.json");
const { configDotenv } = require("dotenv");
const { globalAgent } = require("http");
configDotenv();

class PimPage {
  pimSidebarListitem() {
    return global.page.locator('//descendant::span[text()="PIM"]');
  }
  addButton() {
    return global.page.locator('//button[@type="button" and text()=" Add "]');
  }
  firstNameInputField() {
    return global.page.locator('//input[@name="firstName"]');
  }
  lastNameInputField() {
    return global.page.locator('//input[@name="lastName"]');
  }
  employeeIdInputField() {
    return global.page.locator(
      '//label[text()="Employee Id"]/parent::div/following-sibling::div/input'
    );
  }
  saveButton(Number) {
    return global.page.locator(
      `(//button[@type="submit" and text()=" Save "])[${Number}]`
    );
  }
  employeeProfilePhoto() {
    return global.page.locator('//img[@class="employee-image"]');
  }
  personalDetailsNickName() {
    return global.page.locator(
      '//label[text()="Nickname"]/parent::div/following-sibling::div/input'
    );
  }
  personalDetailsOtherIdField() {
    return global.page.locator(
      "//label[text()='Other Id']/parent::div/following-sibling::div/input"
    );
  }
  personalDetailsLicenceNumber() {
    return global.page.locator(
      '//label[text()="Driver\'s License Number"]/parent::div/following-sibling::div/input'
    );
  }
  personalDetailsLicenceExpireDate() {
    return global.page.locator(
      '//label[text()="License Expiry Date"]/parent::div/following-sibling::div/descendant::input'
    );
  }
  nationalityDropDown() {
    return global.page.locator(
      '//label[@class="oxd-label" and text()="Nationality"]/parent::div/following-sibling::div'
    );
  }
  nationalityOption() {
    return global.page.locator('//div[@role="option"]/span[text()="Indian"]');
  }
  maritalStatusText() {
    return global.page.locator(
      '//label[@class="oxd-label" and text()="Marital Status"]'
    );
  }
  maritalStatusDropDown() {
    return global.page.locator(
      '//label[text()="Marital Status"]/parent::div/following-sibling::div'
    );
  }
  maritalStatusDropDownValue() {
    return global.page.locator('//div[@role="option"]/span[text()="Single"]');
  }
  militaryServicesInputField() {
    return global.page.locator(
      '//label[@class="oxd-label" and text()="Military Service"]/parent::div/following-sibling::div/input'
    );
  }
  genderOption() {
    return global.page.locator(
      '(//input[@type="radio"])[1]/following-sibling::span'
    );
  }
  employeeListTab() {
    return global.page.locator('//li/a[text()="Employee List"]');
  }
  employeeNameSearchInput() {
    return global.page.locator(
      '(//input[@placeholder="Type for hints..."])[1]'
    );
  }
  searchButton() {
    return global.page.locator(
      '//button[@type="submit" and text()=" Search "]'
    );
  }
  saerchResultsTableFirstname(firstname) {
    return global.page.locator(
      `(//div[@class="oxd-table-cell oxd-padding-cell"]/div[text()="${firstname}"])[1]`
    );
  }

  async navigatingToPimPage() {
    await this.pimSidebarListitem().click();
    await expect(page).toHaveURL(/viewEmployeeList/);
  }
  async addingNewEmployeeInAddEmployeeForm() {
    await this.addButton().click();
    await expect(this.firstNameInputField()).toBeVisible();
    await this.firstNameInputField().fill("Demo user");
    await expect(this.lastNameInputField()).toBeVisible();
    await this.lastNameInputField().fill("my_last_name");
    await expect(this.employeeIdInputField()).toBeVisible();
    await this.employeeIdInputField().fill("EMP_FS_400");
    await this.employeeProfilePhotoUploadIntoNewEmployeeForm();
    await this.actionOnSaveButton("1");
  }

  async employeeProfilePhotoUploadIntoNewEmployeeForm() {
    const filePath = process.cwd() + "//testData//nobita-profile.jpg";
    await this.fileUpload(this.employeeProfilePhoto(), filePath);
  }
  async actionOnSaveButton(buttonNumbe) {
    await expect(this.saveButton(buttonNumbe)).toBeVisible();
    await this.saveButton(buttonNumbe).click();
    await page.waitForTimeout(2000);
  }
  async fileUpload(fileUploadInputFiledLocator, filePath) {
    // file upload when HTML element is not visible
    const fileChooserPromise = page.waitForEvent("filechooser");
    await fileUploadInputFiledLocator.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    await page.waitForTimeout(2000);
  }

  async employeePersonalDetailsFormFilling() {
    await expect(this.firstNameInputField()).toBeVisible();
    await this.firstNameInputField().fill("Demo user");
    await expect(this.lastNameInputField()).toBeVisible();
    await this.lastNameInputField().fill("my_last_name");
    await expect(this.employeeIdInputField()).toBeVisible();
    await this.employeeIdInputField().fill("EMP_FS_400");
    // await expect(this.personalDetailsNickName()).toBeVisible();
    // await this.personalDetailsNickName().fill("Nobita");
    await expect(this.personalDetailsOtherIdField()).toBeVisible();
    await this.personalDetailsOtherIdField().fill("AFK-29093-GRZ");
    await expect(this.personalDetailsLicenceNumber()).toBeVisible();
    await this.personalDetailsLicenceNumber().fill("MY-LIC-673)-NO");
    await expect(this.personalDetailsLicenceExpireDate()).toBeVisible();
    await this.personalDetailsLicenceExpireDate().fill("2045-07-04");
    await expect(this.nationalityDropDown()).toBeVisible();
    await this.nationalityDropDown().click();
    await expect(this.nationalityOption()).toBeVisible();
    await this.nationalityOption().click();
    await expect(this.maritalStatusText()).toBeVisible();
    await expect(this.maritalStatusDropDown()).toBeVisible();
    await this.maritalStatusDropDown().click();
    await this.maritalStatusDropDownValue().click();
    await expect(this.militaryServicesInputField()).toBeVisible();
    await this.militaryServicesInputField().fill("I have no experience");
    await this.genderOption().click();
    await this.actionOnSaveButton("1");
  }

  async searchingForTheEmployee() {
    await expect(this.employeeListTab()).toBeVisible();
    await this.employeeListTab().click();
    await expect(this.employeeNameSearchInput()).toBeVisible();
    await this.employeeNameSearchInput().fill("Demo user");
    await expect(this.searchButton()).toBeVisible();
    await this.searchButton().click();
    await page.waitForTimeout(2000);
    await expect(this.saerchResultsTableFirstname("EMP_FS_400")).toBeVisible();
  }
}

module.exports = { PimPage };

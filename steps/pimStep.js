const { When, Then, Given, And } = require("@cucumber/cucumber");;
const { PimPage } = require("../page/pimPage");
// setDefaultTimeout(120 * 1000); 
let pimPage = new PimPage();

Then(/^I navigate to the PIM user creation page to create a new user$/, async() => {
    await pimPage.navigatingToPimPage();
    await pimPage.addingNewEmployeeInAddEmployeeForm();
});

Then(/^I land on the Employee List Details Tab to enter employee personal details$/, async() => {
    await pimPage.employeePersonalDetailsFormFilling();
});

Then(/^I search for the created employee in the PIM page$/, async() => {
    await pimPage.searchingForTheEmployee();
});

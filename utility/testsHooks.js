const { Before, AfterAll } = require('@cucumber/cucumber');
var { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);
const page = require('@playwright/test');

Before({ timeout: 60 * 1000 }, async () => {
    let browser = await page.chromium.launch({ headless: false });
    global.browser = browser;
    const context = await browser.newContext();
    global.page = await context.newPage();
});

AfterAll(async () => {
    if (global.browser) {
        await global.browser.close();
    }
});

const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function () {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Step 01: Login
    await driver.get('https://ecs-qa.kloudship.com');
    await driver.findElement(By.id('email')).sendKeys('kloudship.qa.automation@mailinator.com');
    await driver.findElement(By.id('password')).sendKeys('Password1', Key.RETURN);

    // Step 02: Navigate to Package Types
    await driver.wait(until.elementLocated(By.linkText('Package Types'))).click();

    // Step 03: Click on Add Manually button
    await driver.wait(until.elementLocated(By.partialLinkText('Add Manually'))).click();

    // Step 04: Add a package
    const packageName = 'FirstName_LastName';
    const packageDimensions = Math.floor(Math.random() * 20) + 1;

    await driver.findElement(By.name('name')).sendKeys(packageName);
    await driver.findElement(By.name('dimensions')).sendKeys(packageDimensions, Key.RETURN);

    // Step 05: Logout
    await driver.wait(until.elementLocated(By.partialLinkText('Logout'))).click();

    // Step 06: Login again
    await driver.findElement(By.id('email')).sendKeys('kloudship.qa.automation@mailinator.com');
    await driver.findElement(By.id('password')).sendKeys('Password1', Key.RETURN);

    // Validate
    const homePage = await driver.findElement(By.linkText('Home'));
    assert(homePage, 'Newly created package is not visible after login.');

    console.log('Test case executed successfully.');
  } catch (error) {
    console.error('Test case failed:', error);
  } finally {
    await driver.quit();
  }
})();

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

    // Step 03: Delete the newly added package
    await driver.wait(until.elementLocated(By.xpath("//td[contains(text(), 'FirstName_LastName')]/following-sibling::td/a[contains(@class, 'delete')]")))
      .click();
    await driver.switchTo().alert().accept(); // Confirm deletion

    // Step 04: Logout
    await driver.wait(until.elementLocated(By.partialLinkText('Logout'))).click();

    // Step 05: Login again
    await driver.findElement(By.id('email')).sendKeys('kloudship.qa.automation@mailinator.com');
    await driver.findElement(By.id('password')).sendKeys('Password1', Key.RETURN);

    // Validate
    const deletedPackage = await driver.findElements(By.xpath("//td[contains(text(), 'FirstName_LastName')]"));
    assert(deletedPackage.length === 0, 'Deleted package is still visible after login.');

    console.log('Test case executed successfully.');
  } catch (error) {
    console.error('Test case failed:', error);
  } finally {
    await driver.quit();
  }
})();

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { DataManager } from '../support/dataManager';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Given('I am on the login page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  inventoryPage = new InventoryPage(this.page);
  await loginPage.navigate();
});

When('I navigate directly to the inventory page', async function (this: CustomWorld) {
  await this.page.goto(`${process.env.BASE_URL}/${InventoryPage.INVENTORY_URL}`);
});

When(
  'I login with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await loginPage.login(username, password);
  },
);

When('I login as {string}', async function (this: CustomWorld, userKey: string) {
  const user = DataManager.getUser(userKey);
  await loginPage.login(user.username, user.password || '');
});

When('I enter username {string}', async function (this: CustomWorld, username: string) {
  await loginPage.enterUsername(username);
});

When('I enter password {string}', async function (this: CustomWorld, password: string) {
  await loginPage.enterPassword(password);
});

When('I click the login button', async function (this: CustomWorld) {
  await loginPage.clickLoginButton();
});

When('I logout', async function (this: CustomWorld) {
  await inventoryPage.logout();
});

Then('I should be redirected to the inventory page', async function (this: CustomWorld) {
  await this.page.waitForURL(`**/${InventoryPage.INVENTORY_URL}`, { timeout: 10000 });
  const isDisplayed = await inventoryPage.isInventoryPageDisplayed();
  expect(isDisplayed).toBe(true);
});

Then(
  'I should see the products page title {string}',
  async function (this: CustomWorld, expectedTitle: string) {
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe(expectedTitle);
  },
);

Then(
  'I should see a login error message {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(expectedMessage);
  },
);

Then('I should be on the login page', async function (this: CustomWorld) {
  if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is not defined');
  const isLoginPage = await loginPage.isLoginPageDisplayed();
  expect(isLoginPage).toBe(true);
});

Then('I should see inventory items', async function (this: CustomWorld) {
  const itemCount = await inventoryPage.getInventoryItemCount();
  expect(itemCount).toBeGreaterThan(0);
});

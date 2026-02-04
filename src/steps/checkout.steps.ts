import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { DataManager } from '../support/dataManager';

let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;

Given('I am on the cart page', async function (this: CustomWorld) {
  inventoryPage = new InventoryPage(this.page);
  checkoutPage = new CheckoutPage(this.page);
  await inventoryPage.goToCart();
  await expect(this.page).toHaveURL(new RegExp(InventoryPage.CART_URL));
});

When('I click the checkout button', async function (this: CustomWorld) {
  await checkoutPage.clickCheckout();
});

When('I fill in the shipping information', async function (this: CustomWorld) {
  const info = DataManager.getCheckoutInfo();
  await checkoutPage.fillInformation(info.firstName, info.lastName, info.postalCode);
});

When('I fill in firstName and lastName', async function (this: CustomWorld) {
  const info = DataManager.getCheckoutInfo();
  await checkoutPage.fillInformation(info.firstName, info.lastName, '');
});

When('I fill in shipping information with very long strings', async function (this: CustomWorld) {
  const info = DataManager.getLongTextCheckoutInfo();
  await checkoutPage.fillInformation(info.firstName, info.lastName, info.postalCode);
});

When('I click continue', async function (this: CustomWorld) {
  await checkoutPage.clickContinue();
});

When('I click finish', async function (this: CustomWorld) {
  await checkoutPage.clickFinish();
});

Then(
  'I should see the checkout complete message {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toBe(expectedMessage);
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBe(true);
  },
);

Then(
  'I should see a checkout error message {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    const message = await checkoutPage.getErrorMessage();
    expect(message).toContain(expectedMessage);
  },
);

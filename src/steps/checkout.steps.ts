import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { DataManager } from '../support/DataManager';

let productsPage: ProductsPage;
let checkoutPage: CheckoutPage;

Given('I am on the cart page', async function (this: CustomWorld) {
    productsPage = new ProductsPage(this.page);
    checkoutPage = new CheckoutPage(this.page);
    await productsPage.goToCart();
    await expect(this.page).toHaveURL(/cart.html/);
});

When('I click the checkout button', async function (this: CustomWorld) {
    await checkoutPage.clickCheckout();
});

When('I fill in the shipping information', async function (this: CustomWorld) {
    const info = DataManager.getCheckoutInfo();
    await checkoutPage.fillInformation(info.firstName, info.lastName, info.postalCode);
});

When('I fill in partial shipping information \\(missing zip)', async function (this: CustomWorld) {
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

Then('I should see the checkout complete message {string}', async function (this: CustomWorld, expectedMessage: string) {
    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toBe(expectedMessage);
    const isComplete = await checkoutPage.isCheckoutComplete();
    expect(isComplete).toBe(true);
});

Then('I should see a checkout error message {string}', async function (this: CustomWorld, expectedMessage: string) {
    const message = await checkoutPage.getErrorMessage();
    expect(message).toContain(expectedMessage);
});

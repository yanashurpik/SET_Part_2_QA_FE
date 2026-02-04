import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { DataManager } from '../support/DataManager';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let productDetailPage: ProductDetailPage;

Given('I am logged in as {string}', async function (this: CustomWorld, userKey: string) {
  const user = DataManager.getUser(userKey);
  loginPage = new LoginPage(this.page);
  inventoryPage = new InventoryPage(this.page);
  productDetailPage = new ProductDetailPage(this.page);

  // Fast path: if session is already active (via storageState)
  if (userKey === 'standard_user') {
    await this.page.goto(`${process.env.BASE_URL}/${InventoryPage.INVENTORY_URL}`);
    if (this.page.url().includes(InventoryPage.INVENTORY_URL)) {
      return;
    }
  }

  await loginPage.navigate();
  await loginPage.login(user.username, user.password || '');
  await expect(this.page).toHaveURL(new RegExp(InventoryPage.INVENTORY_URL));
});

When('I click on the product {string}', async function (this: CustomWorld, productKey: string) {
  const name = DataManager.getProduct(productKey).name;
  await inventoryPage.clickOnProductByName(name);
});

Then(
  'I should be on the product detail page for {string}',
  async function (this: CustomWorld, productKey: string) {
    const name = DataManager.getProduct(productKey).name;
    await expect(this.page).toHaveURL(new RegExp(InventoryPage.PRODUCT_DETAIL_URL));
    const detailName = await productDetailPage.getProductName();
    expect(detailName).toBe(name);
  },
);

When('I sort products by price high to low', async function (this: CustomWorld) {
  await inventoryPage.selectSortOption('hilo');
});

When('I add all products to the cart', async function (this: CustomWorld) {
  const count = await inventoryPage.getInventoryItemCount();
  for (let i = 0; i < count; i++) {
    await inventoryPage.addItemToCart(0); // Always click the first available 'Add to Cart' button
  }
});

When('I navigate back to the products inventory', async function (this: CustomWorld) {
  await inventoryPage.clickContinueShopping();
});

Given(
  'I am logged in as {string} with password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    loginPage = new LoginPage(this.page);
    inventoryPage = new InventoryPage(this.page);
    productDetailPage = new ProductDetailPage(this.page);
    await loginPage.navigate();
    await loginPage.login(username, password);
    await expect(this.page).toHaveURL(new RegExp(InventoryPage.INVENTORY_URL));
  },
);

Then('I should see {int} products on the page', async function (this: CustomWorld, count: number) {
  const productCount = await inventoryPage.getInventoryItemCount();
  expect(productCount).toBe(count);
});

When('I add {string} to the cart', async function (this: CustomWorld, productKey: string) {
  const name = DataManager.getProductSafe(productKey)?.name ?? productKey;
  await inventoryPage.addItemToCartByName(name);
});

When('I remove {string} from the cart', async function (this: CustomWorld, _productKey: string) {
  await inventoryPage.removeItemFromCart(0);
});

Then(
  'the shopping cart badge should show {int}',
  async function (this: CustomWorld, count: number) {
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(count);
  },
);

Then('the shopping cart badge should not be displayed', async function (this: CustomWorld) {
  const cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe(0);
});

When('I sort products by {string}', async function (this: CustomWorld, sortOption: string) {
  const option = DataManager.getSortOption(sortOption);
  await inventoryPage.selectSortOption(option);
});

Then(
  'the first product should be {string}',
  async function (this: CustomWorld, expectedNameOrKey: string) {
    const expectedName = DataManager.getProductSafe(expectedNameOrKey)?.name ?? expectedNameOrKey;
    const names = await inventoryPage.getProductNames();
    expect(names[0]).toBe(expectedName);
  },
);

Then(
  'the first product price should be {string}',
  async function (this: CustomWorld, expectedPriceOrKey: string) {
    const expectedPrice =
      DataManager.getProductSafe(expectedPriceOrKey)?.price ?? expectedPriceOrKey;
    const prices = await inventoryPage.getProductPrices();
    expect(prices[0]).toBe(expectedPrice);
  },
);

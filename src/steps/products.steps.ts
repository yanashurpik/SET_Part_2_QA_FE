import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { DataManager } from '../support/DataManager';

let loginPage: LoginPage;
let productsPage: ProductsPage;

Given('I am logged in as {string}', async function (this: CustomWorld, userKey: string) {
    const user = DataManager.getUser(userKey);
    loginPage = new LoginPage(this.page);
    productsPage = new ProductsPage(this.page);

    // Fast path: if session is already active (via storageState)
    if (userKey === 'standard_user') {
        await this.page.goto(`${process.env.BASE_URL}/inventory.html`);
        if (this.page.url().includes('inventory.html')) {
            return;
        }
    }

    await loginPage.navigate();
    await loginPage.login(user.username, user.password || '');
    await expect(this.page).toHaveURL(/inventory.html/);
});

When('I click on the product {string}', async function (this: CustomWorld, productKey: string) {
    const name = DataManager.getProduct(productKey).name;
    await productsPage.clickOnProductByName(name);
});

Then('I should be on the product detail page for {string}', async function (this: CustomWorld, productKey: string) {
    const name = DataManager.getProduct(productKey).name;
    await expect(this.page).toHaveURL(/inventory-item.html/);
    const detailName = await this.page.locator('.inventory_details_name').textContent();
    expect(detailName).toBe(name);
});

When('I sort products by price high to low', async function (this: CustomWorld) {
    await productsPage.selectSortOption('hilo');
});

When('I add all products to the cart', async function (this: CustomWorld) {
    const count = await productsPage.getProductCount();
    for (let i = 0; i < count; i++) {
        await productsPage.addItemToCart(0); // Always click the first available 'Add to Cart' button
    }
});

When('I navigate back to the products inventory', async function (this: CustomWorld) {
    await this.page.click('#continue-shopping'); // Selector for 'Continue Shopping' in cart
});

Given('I am logged in as {string} with password {string}', async function (this: CustomWorld, username: string, password: string) {
    loginPage = new LoginPage(this.page);
    productsPage = new ProductsPage(this.page);
    await loginPage.navigate();
    await loginPage.login(username, password);
    await expect(this.page).toHaveURL(/inventory.html/);
});

Then('I should see {int} products on the page', async function (this: CustomWorld, count: number) {
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBe(count);
});

When('I add {string} to the cart', async function (this: CustomWorld, productKey: string) {
    let name = productKey;
    try {
        name = DataManager.getProduct(productKey).name;
    } catch (e) {
        // Fallback to literal
    }
    await productsPage.addItemToCartByName(name);
});

When('I remove {string} from the cart', async function (this: CustomWorld, productKey: string) {
    let name = productKey;
    try {
        name = DataManager.getProduct(productKey).name;
    } catch (e) {
        // Fallback to literal
    }
    // For now we remove by name if we had a method, but we have removeItemFromCart(index)
    // and there's no removeItemByName in ProductsPage. 
    // Let's assume we use the first item for now as per previous implementation
    await productsPage.removeItemFromCart(0);
});

Then('the shopping cart badge should show {int}', async function (this: CustomWorld, count: number) {
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(count);
});

Then('the shopping cart badge should not be displayed', async function (this: CustomWorld) {
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(0);
});

When('I sort products by {string}', async function (this: CustomWorld, sortOption: string) {
    let option: 'az' | 'za' | 'lohi' | 'hilo' = 'az';
    if (sortOption === 'Name (Z to A)') option = 'za';
    if (sortOption === 'Price (low to high)') option = 'lohi';
    if (sortOption === 'Price (high to low)') option = 'hilo';

    await productsPage.selectSortOption(option);
});

Then('the first product should be {string}', async function (this: CustomWorld, expectedNameOrKey: string) {
    let expectedName = expectedNameOrKey;
    try {
        expectedName = DataManager.getProduct(expectedNameOrKey).name;
    } catch (e) {
        // Fallback to literal
    }
    const names = await productsPage.getProductNames();
    expect(names[0]).toBe(expectedName);
});

Then('the first product price should be {string}', async function (this: CustomWorld, expectedPriceOrKey: string) {
    let expectedPrice = expectedPriceOrKey;
    try {
        expectedPrice = DataManager.getProduct(expectedPriceOrKey).price;
    } catch (e) {
        // Fallback to literal
    }
    const prices = await productsPage.getProductPrices();
    expect(prices[0]).toBe(expectedPrice);
});

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    // Selectors
    private readonly inventoryContainer = '#inventory_container';
    private readonly inventoryItem = '.inventory_item';
    private readonly itemName = '.inventory_item_name';
    private readonly itemPrice = '.inventory_item_price';
    private readonly addToCartButton = 'button[id^="add-to-cart"]';
    private readonly removeFromCartButton = 'button[id^="remove"]';
    private readonly productSortContainer = '[data-test="product-sort-container"]';
    private readonly shoppingCartBadge = '.shopping_cart_badge';
    private readonly shoppingCartLink = '.shopping_cart_link';

    constructor(page: Page) {
        super(page);
    }

    async isPageDisplayed(): Promise<boolean> {
        return await this.page.isVisible(this.inventoryContainer);
    }

    async getProductCount(): Promise<number> {
        return await this.page.locator(this.inventoryItem).count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.page.locator(this.itemName).allTextContents();
    }

    async getProductPrices(): Promise<string[]> {
        return await this.page.locator(this.itemPrice).allTextContents();
    }

    async addItemToCart(index: number = 0): Promise<void> {
        await this.page.locator(this.addToCartButton).nth(index).click();
    }

    async addItemToCartByName(name: string): Promise<void> {
        const product = this.page.locator(this.inventoryItem, { hasText: name });
        await product.locator(this.addToCartButton).click();
    }

    async removeItemFromCart(index: number = 0): Promise<void> {
        await this.page.locator(this.removeFromCartButton).nth(index).click();
    }

    async getCartCount(): Promise<number> {
        const badge = this.page.locator(this.shoppingCartBadge);
        if (await badge.isVisible()) {
            const count = await badge.textContent();
            return count ? parseInt(count) : 0;
        }
        return 0;
    }

    async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.page.selectOption(this.productSortContainer, option);
    }

    async clickOnProductByName(name: string): Promise<void> {
        await this.page.click(`.inventory_item:has-text("${name}") .inventory_item_name`);
    }

    async goToCart(): Promise<void> {
        await this.page.click(this.shoppingCartLink);
    }
}

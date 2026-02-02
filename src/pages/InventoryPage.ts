import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    // Selectors
    private readonly inventoryContainer = '#inventory_container';
    private readonly inventoryItems = '.inventory_item';
    private readonly itemName = '.inventory_item_name';
    private readonly itemPrice = '.inventory_item_price';
    private readonly addToCartButton = 'button[id^="add-to-cart"]';
    private readonly removeFromCartButton = 'button[id^="remove"]';
    private readonly productSortContainer = '[data-test="product-sort-container"]';
    private readonly shoppingCartBadge = '.shopping_cart_badge';
    private readonly shoppingCartLink = '.shopping_cart_link';
    private readonly burgerMenuButton = '#react-burger-menu-btn';
    private readonly logoutLink = '#logout_sidebar_link';
    private readonly pageTitle = '.title';

    constructor(page: Page) {
        super(page);
    }

    async isInventoryPageDisplayed(): Promise<boolean> {
        return await this.page.isVisible(this.inventoryContainer);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.textContent(this.pageTitle) || '';
    }

    async getInventoryItemCount(): Promise<number> {
        return await this.page.locator(this.inventoryItems).count();
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
        const product = this.page.locator(this.inventoryItems, { hasText: name });
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

    async openBurgerMenu(): Promise<void> {
        await this.page.click(this.burgerMenuButton);
    }

    async logout(): Promise<void> {
        await this.openBurgerMenu();
        await this.page.waitForSelector(this.logoutLink, { state: 'visible' });
        await this.page.click(this.logoutLink);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}

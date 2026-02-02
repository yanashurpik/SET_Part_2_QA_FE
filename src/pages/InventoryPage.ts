import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    // Selectors
    private readonly inventoryContainer = '#inventory_container';
    private readonly inventoryItems = '.inventory_item';
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

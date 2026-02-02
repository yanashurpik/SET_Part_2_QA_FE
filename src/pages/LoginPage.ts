import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // Selectors
    private readonly usernameInput = '#user-name';
    private readonly passwordInput = '#password';
    private readonly loginButton = '#login-button';
    private readonly errorMessage = '[data-test="error"]';
    private readonly errorButton = '.error-button';

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is not defined');
        await this.page.goto(process.env.BASE_URL);
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async enterUsername(username: string): Promise<void> {
        await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLoginButton(): Promise<void> {
        await this.page.click(this.loginButton);
    }

    async getErrorMessage(): Promise<string> {
        await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
        return await this.page.textContent(this.errorMessage) || '';
    }

    async isErrorDisplayed(): Promise<boolean> {
        return await this.page.isVisible(this.errorMessage);
    }

    async dismissError(): Promise<void> {
        if (await this.page.isVisible(this.errorButton)) {
            await this.page.click(this.errorButton);
        }
    }

    async isLoginPageDisplayed(): Promise<boolean> {
        return await this.page.isVisible(this.loginButton);
    }
}

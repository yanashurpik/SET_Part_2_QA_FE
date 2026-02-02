import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

export interface ICustomWorld extends World {
    browser?: Browser;
    context?: BrowserContext;
    page: Page;
}

export class CustomWorld extends World implements ICustomWorld {
    browser?: Browser;
    context?: BrowserContext;
    private _page?: Page;

    constructor(options: IWorldOptions) {
        super(options);
    }

    get page(): Page {
        if (!this._page) {
            throw new Error('Page not initialized. Make sure to call init() before accessing the page.');
        }
        return this._page;
    }

    set page(value: Page) {
        this._page = value;
    }

    async init(storageState?: string): Promise<void> {
        const browserType = process.env.BROWSER;
        const headless = process.env.HEADLESS !== 'false';

        switch (browserType) {
            case 'firefox':
                this.browser = await firefox.launch({ headless });
                break;
            case 'webkit':
                this.browser = await webkit.launch({ headless });
                break;
            default:
                this.browser = await chromium.launch({ headless });
        }

        this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 },
            recordVideo: process.env.DEBUG ? { dir: 'videos/' } : undefined,
            storageState: storageState,
        });

        this._page = await this.context.newPage();
    }

    async cleanup(): Promise<void> {
        if (this._page) {
            await this._page.close();
        }
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
    }
}

setWorldConstructor(CustomWorld);

import { BeforeAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../pages/LoginPage';
import * as fs from 'fs';

// Set default timeout to 60 seconds
setDefaultTimeout(process.env.STEP_TIMEOUT ? parseInt(process.env.STEP_TIMEOUT) : 60000);

const STORAGE_STATE_PATH = 'storageState.json';

// Global setup: Login once and save session
BeforeAll(async function () {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    // Using hardcoded standard_user for the global session cache
    await loginPage.login('standard_user', 'secret_sauce');
    await context.storageState({ path: STORAGE_STATE_PATH });
    await browser.close();
});

// Before each scenario
Before(async function (this: CustomWorld, scenario) {
    // Only use stored session for non-authentication tests to avoid interference
    const isAuthTest = scenario.pickle.tags.some(tag => tag.name === '@authentication');
    const storageState = (!isAuthTest && fs.existsSync(STORAGE_STATE_PATH)) ? STORAGE_STATE_PATH : undefined;

    await this.init(storageState);

    // Start tracing for Playwright reports
    if (this.context) {
        await this.context.tracing.start({
            screenshots: true,
            snapshots: true,
            sources: true
        });
    }
});

// After each scenario
After(async function (this: CustomWorld, { result, pickle }) {
    const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = Date.now();

    if (this.page && this.context) {
        // Take screenshot on failure
        if (result?.status === Status.FAILED) {
            await this.page.screenshot({
                path: `playwright-report/screenshots/${scenarioName}-${timestamp}.png`,
                fullPage: true,
            });
        }

        // Stop tracing and save for Playwright report
        const traceStatus = result?.status === Status.FAILED ? 'failed' : 'passed';
        await this.context.tracing.stop({
            path: `playwright-report/traces/${scenarioName}-${traceStatus}-${timestamp}.zip`
        });
    }

    await this.cleanup();
});

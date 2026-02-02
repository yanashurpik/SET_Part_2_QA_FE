import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';

// Set default timeout to 60 seconds
setDefaultTimeout(process.env.STEP_TIMEOUT ? parseInt(process.env.STEP_TIMEOUT) : 60000);

// Before each scenario
Before(async function (this: CustomWorld, scenario) {
    await this.init();

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

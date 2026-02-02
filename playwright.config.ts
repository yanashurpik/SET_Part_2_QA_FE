import { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
    testDir: './src/features',
    timeout: 30000,
    retries: 0,
    use: {
        baseURL: process.env.BASE_URL,
        headless: process.env.HEADLESS !== 'false',
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' },
        },
    ],
    reporter: [
        ['html', { outputFolder: 'playwright-report' }],
        ['list'],
    ],
};

export default config;

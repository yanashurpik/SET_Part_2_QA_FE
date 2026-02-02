const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
    jsonDir: './reports',
    reportPath: './reports/html-report',
    metadata: {
        browser: {
            name: 'chromium',
            version: 'latest'
        },
        device: 'Local Machine',
        platform: {
            name: 'macOS'
        }
    },
    customData: {
        title: 'Test Execution Summary',
        data: [
            { label: 'Project', value: 'Playwright + Cucumber BDD' },
            { label: 'Execution Date', value: new Date().toLocaleDateString() }
        ]
    }
});

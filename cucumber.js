require('dotenv').config();

module.exports = {
    default: {
        paths: ['src/features/**/*.feature'],
        require: ['src/steps/**/*.ts', 'src/support/**/*.ts'],
        requireModule: ['ts-node/register'],
        format: [
            'progress-bar',
            'summary',
            'json:reports/cucumber-report.json'
        ],
        tags: 'not @skip',
        formatOptions: {
            snippetInterface: 'async-await'
        },
        parallel: 4,
        timeout: process.env.STEP_TIMEOUT ? parseInt(process.env.STEP_TIMEOUT) : 60000
    }
};

const { defineConfig } = require('cypress');
const od = require('onlydata');
const env = od('src/env.od');

function trimEndSlash(url) {
    return url.replace(/\/$/, '');
}

module.exports = defineConfig({
    watchForFileChanges: false,
    defaultCommandTimeout: 4000,
    downloadsFolder: 'test/downloads',
    fileServerFolder: 'test',
    fixturesFolder: 'test/data',
    screenshotsFolder: 'test/screenshots',
    videosFolder: 'test/videos',
    modifyObstructiveCode: false,
    e2e: {
        baseUrl: env.url,
        supportFile: false,
        specPattern: 'test/*.spec.{js,jsx}',
        slowTestThreshold: 3000
    },
    env: {
        SITE_URL: trimEndSlash(env.url)
    }
});

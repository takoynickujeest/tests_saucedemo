const { defineConfig } = require("cypress");

module.exports = defineConfig({
    browserHeight: 1080,
    browserWidth: 1920,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    numTestsKeptInMemory: 0,
    requestTimeout: 10000,
    responseTimeout: 90000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

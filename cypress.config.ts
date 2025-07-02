const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer'); 

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    specPattern: 'cypress/tests/**/*.cy.{js,ts,jsx,tsx}',
    baseUrl: 'https://dummyjson.com',
    env: {
      allure: true,
      allureResultsPath: 'allure-results', 
    },
  },
});

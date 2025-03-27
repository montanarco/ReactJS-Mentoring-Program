const { defineConfig } = require("cypress");
require("ts-node").register();
const UserConfig = require("./vite.config.ts");

module.exports = defineConfig({
  component: {
    supportFile: false,
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: UserConfig,
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
  },
});

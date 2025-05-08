import { defineConfig } from 'cypress';
import { createRequire } from 'module';
const require = createRequire(import.meta.url); // Create CommonJS require in ES Module scope

require('ts-node').register(); // Register ts-node to handle TypeScript files
const viteConfig = require('./vite.config.ts').default;

export default defineConfig({
  component: {
    supportFile: false,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig, // Pass the loaded config
    },
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {

    },
  },
});
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: './tsconfig.json',
    },
  },
  viteFinal: async (config, { configType }) => {
    const storybookViteConfig = require('./vite.storybook.config.js'); // Import the .js file
    return {
      ...storybookViteConfig,
      ...config,
    };
  },
};

export default config;
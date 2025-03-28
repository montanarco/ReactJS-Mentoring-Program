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
      tsconfigPath: './apps/dawn-ui/tsconfig.storybook.json'
    },
  },
  viteFinal: async (config) => {
    config.esbuild = {
      loader: 'tsx',
      include: /\.tsx?$/,
    };
    return config;
  },
};

export default config;
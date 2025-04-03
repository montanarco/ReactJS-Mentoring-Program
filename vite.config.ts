import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig as defineVitestConfig } from 'vitest/config';

export default defineVitestConfig({
  plugins: [react()],
  esbuild: {
    loader: 'tsx',
    include: /\.tsx?$/,
    target: 'esnext',
  },
  test: {
    environment: 'jsdom', 
    globals: true, 
    setupFiles: './src/setup.js', 
  },
});
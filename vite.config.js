import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['mongoose'], // mongooseを外部モジュールとして扱う
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  test: {
    globals: true,
    setupFiles: './tests/setup/vitest-setup.js',
    environment: 'jsdom',
  },
});

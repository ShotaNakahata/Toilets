// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000' // '/api' で始まるリクエストを 'http://localhost:4000' に転送
    }
  },
  test: {
    globals: true,
    setupFiles: './tests/setup/vitest-setup.js',
    environment: 'jsdom',
  },
});

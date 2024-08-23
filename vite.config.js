import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';  // 追加

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // エイリアス設定を追加
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000', // '/api' で始まるリクエストを 'http://localhost:4000' に転送
    },
  },
  test: {
    globals: true,
    setupFiles: './tests/setup/vitest-setup.js',
    environment: 'jsdom',
  },
});


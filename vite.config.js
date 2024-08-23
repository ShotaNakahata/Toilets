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
  build: {
    ssr: 'src/server.ts',
    outDir: 'dist',      
    rollupOptions: {
      input: 'src/server.ts',
      output: {
        entryFileNames: 'server.js',
      },
    },
  },
});

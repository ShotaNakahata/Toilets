// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   root: path.resolve(__dirname),
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@config': path.resolve(__dirname, 'src/config'),
//       '@frontend': path.resolve(__dirname, 'src'),
//     },
//   },
//   server: {
//     proxy: {
//       '/api': process.env.VITE_API_URL || 'http://localhost:4000',
//     },
//   },
//   cacheDir: path.resolve(__dirname, '.vite'),
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, 'src/config'),
      '@frontend': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': process.env.VITE_API_URL || 'http://localhost:4000',
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../dist/frontend'),  // 出力先を指定
  },
  cacheDir: path.resolve(__dirname, '.vite'),
});

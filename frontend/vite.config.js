// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   root: path.resolve(__dirname),
//   plugins: [
//     react(),
//   ],
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
//   build: {
//     outDir: path.resolve(__dirname, '../dist/frontend'),  // 出力先を指定
//   },
//   cacheDir: path.resolve(__dirname, '.vite'),
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ViteサーバーのURLをログに出力するプラグイン
const logServerUrl = () => {
  return {
    name: 'log-server-url',
    configureServer(server) {
      server.httpServer?.on('listening', () => {
        const address = server.httpServer.address();
        const host = address.family === 'IPv6' ? `[${address.address}]` : address.address;
        const url = `http://${host}:${address.port}`;
        console.log(`Frontend server is running on ${url}`);
      });
    },
  };
};

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [
    react(),
    logServerUrl(),
  ],
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

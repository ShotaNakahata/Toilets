
// src/config/config.ts

const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
    // 他の設定もここに追加できます
};

export default config;

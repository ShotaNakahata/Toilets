// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Router をインポート
import './styles/global.css'; // global.css をインポート
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>
);

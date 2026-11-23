import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register PWA service worker
import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onNeedRefresh() {
    // Automatically or politely updates on new version
    console.log('Nueva versión disponible en John Polo 2027');
  },
  onOfflineReady() {
    console.log('Plataforma lista para funcionar sin conexión (Offline)');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


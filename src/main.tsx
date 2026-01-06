import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import './i18n';

console.log('main.tsx: Script loaded');

const rootElement = document.getElementById('root');
console.log('main.tsx: Root element:', rootElement);

if (!rootElement) {
  document.body.innerHTML = '<div style="color: white; padding: 20px; font-family: sans-serif;">Error: Root element not found</div>';
  throw new Error('Root element not found');
}

try {
  console.log('main.tsx: Creating React root');
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('main.tsx: React app rendered');
} catch (error) {
  console.error('main.tsx: Failed to render app:', error);
  document.body.innerHTML = `<div style="color: white; padding: 20px; font-family: sans-serif;">
    <h1>Error loading application</h1>
    <p>${error}</p>
    <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">Reload</button>
  </div>`;
}

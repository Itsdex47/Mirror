import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Using a relative path 'sw.js' is the most robust way to register a service worker
    // as it allows the browser to resolve the URL relative to the current document's base.
    // We avoid using the 'new URL()' constructor here to prevent 'Invalid URL' errors 
    // that can occur in certain sandboxed iframe environments.
    navigator.serviceWorker.register('sw.js')
      .then(reg => {
        console.log('Service Worker registered successfully with scope:', reg.scope);
      })
      .catch(err => {
        // We log a warning instead of an error because Service Workers are a progressive enhancement
        // and are often blocked by browser security policies in development sandboxes or frames.
        console.warn('Service Worker registration skipped or failed:', err.message);
      });
  });
}

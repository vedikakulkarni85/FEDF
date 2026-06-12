// ============================================================
// ENTRY POINT - src/index.js
// This file mounts the React App into the HTML page.
// React finds <div id="root"> in public/index.html and renders
// the <App /> component inside it.
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';   // Global styles (copied from style.css)
import App from './App'; // Main App component

// Create a React root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

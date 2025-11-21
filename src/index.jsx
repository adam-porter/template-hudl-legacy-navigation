import React from 'react';
import ReactDOM from 'react-dom/client';

// TODO: Import shared design system styles once package exports are configured
// import '@adam-porter/shared-uniform-styles';

// Import local styles (will override/extend design tokens as needed)
import './styles/index.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

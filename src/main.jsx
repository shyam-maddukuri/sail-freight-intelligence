import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { FreightProvider } from './context/FreightContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FreightProvider>
      <App />
    </FreightProvider>
  </React.StrictMode>,
);

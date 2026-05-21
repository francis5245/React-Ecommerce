// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // Tout est centralisé là-dedans maintenant

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
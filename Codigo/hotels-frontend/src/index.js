import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import HotelDetailPage from './pages/HotelDetailPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


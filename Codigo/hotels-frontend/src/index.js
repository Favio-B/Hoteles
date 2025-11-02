import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import './index.css';
import App from './App';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import HotelDetailPage from './pages/HotelDetailPage';
>>>>>>> 80d62c4 (Commit 4)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 80d62c4 (Commit 4)
  </React.StrictMode>
);


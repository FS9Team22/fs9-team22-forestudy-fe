import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home/home';
import CreatePage from './pages/create/create';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

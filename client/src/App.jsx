import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// Import Pages
import Home from './pages/Home';
import PredictionForm from './pages/PredictionForm';
import PalmReading from './pages/PalmReading';
import KundliGenerator from './pages/KundliGenerator';

function App() {
  // Auto-wakeup script to ping Render's cold-start server on app load
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://jyotishpeeth.onrender.com';
    fetch(`${API_URL}`).catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="predict" element={<PredictionForm />} />
          <Route path="palm-reading" element={<PalmReading />} />
          <Route path="kundli" element={<KundliGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

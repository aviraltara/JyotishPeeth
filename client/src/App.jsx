import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// Import Pages
import Home from './pages/Home';
import PredictionForm from './pages/PredictionForm';
import PalmReading from './pages/PalmReading';
import KundliGenerator from './pages/KundliGenerator';

function App() {
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

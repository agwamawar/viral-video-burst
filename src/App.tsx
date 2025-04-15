
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import ViralityReport from './components/virality/ViralityReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/virality-report" element={<ViralityReport />} />
      </Routes>
    </Router>
  );
}

export default App;

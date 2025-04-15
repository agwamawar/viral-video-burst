
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import ViralityReport from '@/pages/ViralityReport';
import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/report" element={<ViralityReport />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;

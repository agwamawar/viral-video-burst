
import React from 'react';
import ResultsDisplay from './components/ResultsDisplay';
import { mockResultsData } from './data/mockResults';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ResultsDisplay results={mockResultsData} />
    </div>
  );
}

export default App;

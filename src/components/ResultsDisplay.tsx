
import React from 'react';
import { motion } from 'framer-motion';
import { ResultsData } from '../types/resultsTypes';
import ConceptSection from './results/ConceptSection';
import ContentSection from './results/ContentSection';
import ViralitySection from './results/ViralitySection';
import CompareSection from './results/CompareSection';
import { mockResultsData } from '../data/mockResults';
import { ChevronDown } from 'lucide-react';

interface ResultsDisplayProps {
  results?: ResultsData;
}

const ResultsDisplay = ({ results = mockResultsData }: ResultsDisplayProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Content Analysis Results
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We've analyzed your content across multiple dimensions. Here's how your content
          performs and how it can be improved.
        </p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 animate-bounce"
        >
          <ChevronDown className="w-6 h-6 mx-auto text-gray-400" />
        </motion.div>
      </motion.div>

      <div className="space-y-8">
        <ConceptSection data={results.concept} />
        <ContentSection data={results.content} />
        <ViralitySection data={results.virality} />
        <CompareSection data={results.compare} />
      </div>
    </div>
  );
};

export default ResultsDisplay;

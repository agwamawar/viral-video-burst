
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import ConceptSection from './ConceptSection';
import ContentSection from './ContentSection';
import ViralityMetricsSection from './ViralityMetricsSection';
import SimilarContentSection from './SimilarContentSection';

const ViralityReport = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Upload
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Virality Report</h1>
      </div>
      
      <div className="space-y-6">
        <ConceptSection />
        <ContentSection />
        <ViralityMetricsSection />
        <SimilarContentSection />
      </div>
    </div>
  );
};

export default ViralityReport;

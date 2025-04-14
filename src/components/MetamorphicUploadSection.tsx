
import React, { useState, useRef } from 'react';
import { toast } from "sonner";
import { ViralityResult } from "@/types/types";
import ResultsDisplay from "@/components/ResultsDisplay";
import UploadForm from "@/components/upload/UploadForm";
import ErrorDisplay from "@/components/upload/ErrorDisplay";
import { simulateAnalysis } from "@/utils/analysisSimulation";

const platforms = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Snapchat'];
const analysisTypes = ['Quick Analysis', 'Standard Analysis', 'Deep Analysis'];

const MetamorphicUploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<ViralityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState(analysisTypes[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      toast.info(`Selected file: ${file.name}`);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const simulateUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          simulateAnalysis(selectedFile, setIsUploading, setResults);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setResults(null);
    setUploadProgress(0);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      {error && !results && (
        <ErrorDisplay error={error} />
      )}
      
      {!results ? (
        <UploadForm
          selectedFile={selectedFile}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          handleFileChange={handleFileChange}
          handleUploadClick={handleUploadClick}
          simulateUpload={simulateUpload}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedAnalysisType={selectedAnalysisType}
          setSelectedAnalysisType={setSelectedAnalysisType}
          fileInputRef={fileInputRef}
        />
      ) : (
        <ResultsDisplay result={results} onReset={handleReset} />
      )}
    </div>
  );
};

export default MetamorphicUploadSection;

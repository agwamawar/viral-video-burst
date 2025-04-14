
import React from 'react';
import { Card } from "@/components/ui/card";
import ResultsDisplay from "@/components/ResultsDisplay";
import FileUploadInput from './minimal-upload/FileUploadInput';
import UploadActions from './minimal-upload/UploadActions';
import UploadProgressBar from './minimal-upload/UploadProgressBar';
import AnalysisError from './minimal-upload/AnalysisError';
import { useMinimalUpload } from '@/hooks/useMinimalUpload';

const MinimalUploadSection = () => {
  const {
    isUploading,
    uploadProgress,
    results,
    error,
    selectedFile,
    selectedPlatform,
    setSelectedPlatform,
    selectedAnalysisType,
    setSelectedAnalysisType,
    handleFileChange,
    simulateUpload,
    handleReset
  } = useMinimalUpload();

  return (
    <div className="max-w-2xl mx-auto">
      {error && !results && (
        <AnalysisError error={error} />
      )}
      
      {!results ? (
        <Card className="border border-border/50 dark:border-border/30 dark:bg-card/50 backdrop-blur-sm">
          <div className="flex items-center p-2 rounded-md">
            <FileUploadInput 
              selectedFile={selectedFile} 
              onChange={handleFileChange} 
            />
            
            <UploadActions 
              selectedFile={selectedFile}
              isUploading={isUploading}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              selectedAnalysisType={selectedAnalysisType}
              setSelectedAnalysisType={setSelectedAnalysisType}
              onUpload={simulateUpload}
            />
          </div>
          
          {isUploading && (
            <UploadProgressBar uploadProgress={uploadProgress} />
          )}
        </Card>
      ) : (
        <ResultsDisplay result={results} onReset={handleReset} />
      )}
    </div>
  );
};

export default MinimalUploadSection;


import React from 'react';
import { ViralityResult } from "@/types/types";
import ResultsDisplay from "@/components/ResultsDisplay";
import UploadForm from "@/components/upload/UploadForm";
import ErrorDisplay from "@/components/upload/ErrorDisplay";
import { useUpload } from "@/hooks/useUpload";

const platforms = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Snapchat'];
const analysisTypes = ['Quick Analysis', 'Standard Analysis', 'Deep Analysis'];

const MetamorphicUploadSection = () => {
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
    fileInputRef,
    handleFileChange,
    handleUploadClick,
    simulateUpload,
    handleReset
  } = useUpload();

  return (
    <div className="w-full px-4 sm:px-6">
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

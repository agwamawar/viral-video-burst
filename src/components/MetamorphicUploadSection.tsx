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
      <div className="text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-normal mb-2 font-['Alfa_Slab_One'] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-400">Hey, Stranger</h1>
        <p className="text-lg md:text-xl font-normal font-['Urbanist'] text-foreground/90">Let's Make Your Content BlowUp</p>
      </div>
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
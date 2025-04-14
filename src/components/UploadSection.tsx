
import React from 'react';
import UploadHeader from "@/components/upload/UploadHeader";
import UploadCard from "@/components/upload/UploadCard";
import { useVideoUpload } from "@/hooks/useVideoUpload";

const UploadSection = () => {
  const {
    isUploading,
    uploadProgress,
    results,
    error,
    handleUploadStart,
    handleUploadProgress,
    handleUploadSuccess,
    handleUploadError,
    handleReset
  } = useVideoUpload();

  return (
    <section className="py-8 md:py-16 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <UploadHeader />
          
          <UploadCard
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            results={results}
            error={error}
            onUploadStart={handleUploadStart}
            onUploadProgress={handleUploadProgress}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            onReset={handleReset}
          />
        </div>
      </div>
    </section>
  );
};

export default UploadSection;

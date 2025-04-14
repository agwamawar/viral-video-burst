
import { useState } from 'react';
import { toast } from "sonner";
import { ViralityResult } from "@/types/types";

export const useVideoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<ViralityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setResults(null);
    setError(null);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadSuccess = (data: ViralityResult) => {
    setIsUploading(false);
    setUploadProgress(100);
    setResults(data);
    setError(null);
    toast.success("Analysis complete!");
  };

  const handleUploadError = (error: string) => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(error);
    toast.error(`Upload failed: ${error}`);
    
    // Log the error to the console for debugging
    console.error('Upload error:', error);
  };

  const handleReset = () => {
    setResults(null);
    setUploadProgress(0);
    setError(null);
  };

  return {
    isUploading,
    uploadProgress,
    results,
    error,
    handleUploadStart,
    handleUploadProgress,
    handleUploadSuccess,
    handleUploadError,
    handleReset
  };
};


import { useState, useRef } from 'react';
import { toast } from "sonner";
import { ViralityResult } from "@/types/types";
import { simulateAnalysis } from "@/utils/analysisSimulation";

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<ViralityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('Facebook');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('Quick Analysis');
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

  return {
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
  };
};

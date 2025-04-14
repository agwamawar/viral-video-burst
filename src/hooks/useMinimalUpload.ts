
import { useState } from 'react';
import { toast } from "sonner";
import { ViralityResult } from "@/types/types";
import { simulateAnalysis } from "@/utils/analysisSimulation";

export const useMinimalUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<ViralityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('Facebook');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('Quick Analysis');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      toast.info(`Selected file: ${file.name}`);
    }
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
          simulateAnalysisProcess();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateAnalysisProcess = () => {
    setTimeout(() => {
      const mockResult: ViralityResult = {
        fileName: selectedFile?.name || 'video.mp4',
        fileSize: selectedFile?.size || 1024000,
        fileSizeFormatted: `${((selectedFile?.size || 1024000) / (1024 * 1024)).toFixed(2)} MB`,
        viralityScore: Math.floor(Math.random() * 100),
        metrics: {
          engagement: Math.floor(Math.random() * 10),
          retention: `${Math.floor(Math.random() * 50) + 50}%`,
          shareability: Math.floor(Math.random() * 10),
          trendAlignment: Math.floor(Math.random() * 10)
        },
        insights: [
          "Good energy throughout the video",
          "Trending topic detected",
          "Lighting could be improved"
        ],
        recommendations: [
          "Add more hashtags",
          "Post during peak hours (6-9pm)",
          "Include a call to action"
        ],
        timestamp: new Date().toISOString()
      };
      
      setIsUploading(false);
      setResults(mockResult);
      toast.success("Analysis complete!");
    }, 1500);
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
    handleFileChange,
    simulateUpload,
    handleReset
  };
};

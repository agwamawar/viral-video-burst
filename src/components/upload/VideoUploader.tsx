
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ViralityResult } from "@/types/types";
import { mockVideoAnalysis } from "@/lib/mockApi";
import { AlertCircle } from "lucide-react";
import UploadDropZone from "./video/UploadDropZone";
import SelectedFilePreview from "./video/SelectedFilePreview";
import UploadingProgress from "./video/UploadingProgress";
import UploadError from "./video/UploadError";

interface VideoUploaderProps {
  isUploading: boolean;
  progress: number;
  onUploadStart: () => void;
  onUploadProgress: (progress: number) => void;
  onUploadSuccess: (data: ViralityResult) => void;
  onUploadError: (error: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  isUploading,
  progress,
  onUploadStart,
  onUploadProgress,
  onUploadSuccess,
  onUploadError
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (file: File) => {
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    // Reset any previous errors
    setUploadError(null);
    
    if (!file.type.startsWith('video/')) {
      const errorMsg = "Please upload a video file";
      setUploadError(errorMsg);
      toast({
        title: "Invalid file type",
        description: errorMsg,
        variant: "destructive"
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      const errorMsg = "Maximum file size is 50MB";
      setUploadError(errorMsg);
      toast({
        title: "File too large",
        description: errorMsg,
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    
    // Generate preview thumbnail
    if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setUploadError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    // Reset any previous errors
    setUploadError(null);
    onUploadStart();

    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 5;
      
      if (currentProgress >= 95) {
        clearInterval(interval);
        currentProgress = 95;
      }
      
      onUploadProgress(currentProgress);
    }, 300);

    try {
      const result = await mockVideoAnalysis(selectedFile);
      clearInterval(interval);
      onUploadSuccess(result);
    } catch (error) {
      clearInterval(interval);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred during video analysis';
      setUploadError(errorMessage);
      onUploadError(errorMessage);
      
      console.error('Video analysis failed:', error);
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const retryUpload = () => {
    setUploadError(null);
    handleUpload();
  };

  return (
    <div className="space-y-6">
      {uploadError && !isUploading && (
        <UploadError error={uploadError} />
      )}
      
      {!selectedFile && !isUploading && (
        <UploadDropZone onFileSelect={handleFileChange} />
      )}

      {selectedFile && !isUploading && (
        <SelectedFilePreview 
          file={selectedFile} 
          previewUrl={previewUrl}
          onClear={clearSelectedFile}
          onUpload={handleUpload}
        />
      )}

      {isUploading && (
        <UploadingProgress progress={progress} />
      )}

      {uploadError && selectedFile && !isUploading && (
        <Button 
          className="w-full"
          variant="outline"
          onClick={retryUpload}
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          Retry Analysis
        </Button>
      )}
    </div>
  );
};

export default VideoUploader;

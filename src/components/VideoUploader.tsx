
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Video, X, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { mockVideoAnalysis } from "@/lib/mockApi";
import { ViralityResult } from "@/types/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
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
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        disabled={isUploading}
      />
      
      {uploadError && !isUploading && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      
      {!selectedFile && !isUploading && (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <UploadCloud className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-1">Upload your video</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: MP4, MOV, AVI (Max size: 50MB)
          </p>
        </div>
      )}

      {selectedFile && !isUploading && (
        <div className="border rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
              <Video className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearSelectedFile}
            aria-label="Remove selected file"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-muted-foreground">
            {progress < 100 ? 
              `Uploading and analyzing: ${progress}%` : 
              'Processing video...'
            }
          </p>
        </div>
      )}

      {selectedFile && !isUploading && !uploadError && (
        <Button 
          className="w-full bg-gradient-viral hover:bg-gradient-viral hover:opacity-90"
          onClick={handleUpload}
        >
          Analyze Video
        </Button>
      )}

      {uploadError && selectedFile && !isUploading && (
        <Button 
          className="w-full"
          variant="outline"
          onClick={retryUpload}
        >
          Retry Analysis
        </Button>
      )}
    </div>
  );
};

export default VideoUploader;

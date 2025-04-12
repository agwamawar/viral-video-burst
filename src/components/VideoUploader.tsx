
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Video, X, AlertCircle, FileVideo, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { mockVideoAnalysis } from "@/lib/mockApi";
import { ViralityResult } from "@/types/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
    
    // Generate preview thumbnail
    if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
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
    setPreviewUrl(null);
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
        <Alert variant="destructive" className="mb-4 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      
      {!selectedFile && !isUploading && (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300",
            dragActive 
              ? "border-primary bg-primary/5 scale-102" 
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50",
            "dark:border-muted-foreground/10 dark:hover:border-primary/40"
          )}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary animate-pulse">
              <UploadCloud className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium mt-2">Upload your video</h3>
            <p className="text-sm text-muted-foreground mb-2 max-w-xs mx-auto">
              Drag and drop your video file here, or click to browse from your device
            </p>
            <Button variant="outline" className="mt-2">
              <FileVideo className="mr-2 h-4 w-4" />
              Select Video
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Supports: MP4, MOV, AVI (Max size: 50MB)
            </p>
          </div>
        </div>
      )}

      {selectedFile && !isUploading && (
        <div className="border rounded-xl p-6 space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:w-40 h-28 rounded-lg bg-muted overflow-hidden flex-shrink-0">
              {previewUrl ? (
                <video 
                  src={previewUrl} 
                  className="w-full h-full object-cover"
                  muted
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <div className="w-full overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-lg truncate">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to analyze
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearSelectedFile}
                  className="flex-shrink-0"
                  aria-label="Remove selected file"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-viral hover:bg-gradient-viral hover:opacity-90 transition-all"
            onClick={handleUpload}
            size="lg"
          >
            Analyze This Video
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="border rounded-xl p-6 space-y-6 animate-fade-in">
          <div className="text-center mb-2">
            <div className="inline-flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-medium">Processing Your Video</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {progress < 100 ? "Analyzing your content for viral potential..." : "Finalizing your results..."}
            </p>
          </div>
          
          <div className="space-y-2">
            <Progress 
              value={progress} 
              className="h-3" 
              indicatorClassName="bg-gradient-viral"
            />
            <p className="text-right text-sm font-medium">
              {progress}%
            </p>
          </div>
        </div>
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

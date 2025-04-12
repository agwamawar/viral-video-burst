
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Video, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { mockVideoAnalysis } from "@/lib/mockApi";
import { ViralityResult } from "@/types/types";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 50MB",
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    onUploadStart();

    // Simulate upload progress
    const interval = setInterval(() => {
      onUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 300);

    try {
      // Simulate API call
      const result = await mockVideoAnalysis(selectedFile);
      clearInterval(interval);
      onUploadSuccess(result);
    } catch (error) {
      clearInterval(interval);
      onUploadError(error instanceof Error ? error.message : 'Unknown error');
    }
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

      {selectedFile && !isUploading && (
        <Button 
          className="w-full bg-gradient-viral hover:bg-gradient-viral hover:opacity-90"
          onClick={handleUpload}
        >
          Analyze Video
        </Button>
      )}
    </div>
  );
};

export default VideoUploader;

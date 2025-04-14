
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud, FileVideo } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDropZoneProps {
  onFileSelect: (file: File) => void;
}

const UploadDropZone: React.FC<UploadDropZoneProps> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
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
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
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
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
      />
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
  );
};

export default UploadDropZone;

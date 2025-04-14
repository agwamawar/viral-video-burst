
import React from 'react';
import { Button } from "@/components/ui/button";
import { Video, X } from "lucide-react";

interface SelectedFilePreviewProps {
  file: File;
  previewUrl: string | null;
  onClear: () => void;
  onUpload: () => void;
}

const SelectedFilePreview: React.FC<SelectedFilePreviewProps> = ({ 
  file, 
  previewUrl, 
  onClear,
  onUpload
}) => {
  return (
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
              <p className="font-medium text-lg truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to analyze
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClear}
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
        onClick={onUpload}
        size="lg"
      >
        Analyze This Video
      </Button>
    </div>
  );
};

export default SelectedFilePreview;


import React from 'react';
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadControls from '@/components/upload/UploadControls';
import UploadProgress from '@/components/upload/UploadProgress';

interface UploadFormProps {
  selectedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadClick: () => void;
  simulateUpload: () => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  selectedAnalysisType: string;
  setSelectedAnalysisType: (type: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const UploadForm: React.FC<UploadFormProps> = ({
  selectedFile,
  isUploading,
  uploadProgress,
  handleFileChange,
  handleUploadClick,
  simulateUpload,
  selectedPlatform,
  setSelectedPlatform,
  selectedAnalysisType,
  setSelectedAnalysisType,
  fileInputRef
}) => {
  return (
    <Card className="border border-border/50 dark:border-border/30 dark:bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="flex flex-col">
        {/* Top row - upload button */}
        <div className="flex justify-center items-center p-4 border-b border-border/30">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button 
            onClick={handleUploadClick}
            variant="ghost" 
            className={`relative w-full justify-center transition-all duration-300 ${selectedFile ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'}`}
          >
            <Upload className={`h-4 w-4 mr-2 ${selectedFile ? 'text-primary' : 'text-muted-foreground'}`} />
            {selectedFile ? selectedFile.name : "Upload Video"}
          </Button>
        </div>
        
        {/* Bottom row - icons and controls */}
        <UploadControls 
          selectedFile={selectedFile}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          simulateUpload={simulateUpload}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedAnalysisType={selectedAnalysisType}
          setSelectedAnalysisType={setSelectedAnalysisType}
        />
      </div>
      
      {isUploading && (
        <UploadProgress uploadProgress={uploadProgress} />
      )}
    </Card>
  );
};

export default UploadForm;

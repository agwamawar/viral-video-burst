
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PlatformSelector from './PlatformSelector';
import AnalysisTypeSelector from './AnalysisTypeSelector';

interface UploadActionsProps {
  selectedFile: File | null;
  isUploading: boolean;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  selectedAnalysisType: string;
  setSelectedAnalysisType: (type: string) => void;
  onUpload: () => void;
}

const UploadActions: React.FC<UploadActionsProps> = ({
  selectedFile,
  isUploading,
  selectedPlatform,
  setSelectedPlatform,
  selectedAnalysisType,
  setSelectedAnalysisType,
  onUpload
}) => {
  return (
    <div className="flex gap-2">
      <PlatformSelector 
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />
      
      <AnalysisTypeSelector 
        selectedAnalysisType={selectedAnalysisType}
        setSelectedAnalysisType={setSelectedAnalysisType}
      />
      
      <Button 
        onClick={onUpload} 
        disabled={isUploading || !selectedFile}
        size="icon"
        variant="ghost"
        className="h-8 w-8"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UploadActions;

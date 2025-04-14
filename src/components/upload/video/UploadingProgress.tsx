
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface UploadingProgressProps {
  progress: number;
}

const UploadingProgress: React.FC<UploadingProgressProps> = ({ progress }) => {
  return (
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
  );
};

export default UploadingProgress;

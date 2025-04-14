
import React from 'react';

interface UploadProgressProps {
  uploadProgress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ uploadProgress }) => {
  return (
    <div className="px-4 pb-3">
      <div className="w-full bg-muted rounded-full h-1.5 dark:bg-muted/30">
        <div 
          className="progress-value h-1.5 rounded-full bg-primary" 
          style={{ width: `${uploadProgress}%` }} 
        />
      </div>
    </div>
  );
};

export default UploadProgress;

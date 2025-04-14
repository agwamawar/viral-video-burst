
import React from 'react';

interface UploadProgressProps {
  uploadProgress: number;
}

const UploadProgress = React.forwardRef<HTMLDivElement, UploadProgressProps>(
  ({ uploadProgress }, ref) => {
    return (
      <div className="px-4 pb-3" ref={ref}>
        <div className="w-full bg-muted rounded-full h-1.5 dark:bg-muted/30">
          <div 
            className="progress-value h-1.5 rounded-full bg-primary" 
            style={{ width: `${uploadProgress}%` }} 
          />
        </div>
      </div>
    );
  }
);

UploadProgress.displayName = 'UploadProgress';

export default UploadProgress;

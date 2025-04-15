
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import MorphingHeader from './MorphingHeader';

const MetamorphicUploadSection: React.FC = () => {
  const handleUpload = () => {
    toast({
      title: "Upload Initiated",
      description: "Your file is being processed.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <MorphingHeader />
      <Button onClick={handleUpload}>
        Upload File
      </Button>
    </div>
  );
};

export default MetamorphicUploadSection;

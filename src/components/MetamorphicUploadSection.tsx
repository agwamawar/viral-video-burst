
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import MorphingHeader from './MorphingHeader';

const MetamorphicUploadSection: React.FC = () => {
  const handleUpload = () => {
    toast({
      variant: "default",
      description: "Upload functionality coming soon!"
    });
  };

  return (
    <div>
      <MorphingHeader />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default MetamorphicUploadSection;

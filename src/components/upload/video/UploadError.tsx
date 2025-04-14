
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface UploadErrorProps {
  error: string;
}

const UploadError: React.FC<UploadErrorProps> = ({ error }) => {
  return (
    <Alert variant="destructive" className="mb-4 animate-fade-in">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default UploadError;

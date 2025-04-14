
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AnalysisErrorProps {
  error: string;
}

const AnalysisError: React.FC<AnalysisErrorProps> = ({ error }) => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Analysis Failed</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default AnalysisError;

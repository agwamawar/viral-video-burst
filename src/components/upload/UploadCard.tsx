
import React from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import VideoUploader from "@/components/upload/VideoUploader";
import ResultsDisplay from "@/components/ResultsDisplay";
import { ViralityResult } from "@/types/types";

interface UploadCardProps {
  isUploading: boolean;
  uploadProgress: number;
  results: ViralityResult | null;
  error: string | null;
  onUploadStart: () => void;
  onUploadProgress: (progress: number) => void;
  onUploadSuccess: (data: ViralityResult) => void;
  onUploadError: (error: string) => void;
  onReset: () => void;
}

const UploadCard: React.FC<UploadCardProps> = ({
  isUploading,
  uploadProgress,
  results,
  error,
  onUploadStart,
  onUploadProgress,
  onUploadSuccess,
  onUploadError,
  onReset
}) => {
  return (
    <Card className="border-border dark:border-border/50 dark:bg-card/70 backdrop-blur-sm">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">
          {!results ? "Upload Your Video" : "Analysis Results"}
        </CardTitle>
        <CardDescription>
          {!results 
            ? "Drag and drop your video or click to browse" 
            : "Here's what our AI thinks about your video's viral potential"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && !results && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Analysis Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!results ? (
          <VideoUploader
            isUploading={isUploading}
            progress={uploadProgress}
            onUploadStart={onUploadStart}
            onUploadProgress={onUploadProgress}
            onUploadSuccess={onUploadSuccess}
            onUploadError={onUploadError}
          />
        ) : (
          <ResultsDisplay result={results} onReset={onReset} />
        )}
      </CardContent>
    </Card>
  );
};

export default UploadCard;

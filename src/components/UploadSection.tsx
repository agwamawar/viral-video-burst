import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import VideoUploader from "@/components/upload/VideoUploader";
import ResultsDisplay from "@/components/ResultsDisplay";
import { ViralityResult } from "@/types/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const UploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<ViralityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setResults(null);
    setError(null);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadSuccess = (data: ViralityResult) => {
    setIsUploading(false);
    setUploadProgress(100);
    setResults(data);
    setError(null);
    toast.success("Analysis complete!");
  };

  const handleUploadError = (error: string) => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(error);
    toast.error(`Upload failed: ${error}`);
    
    // Log the error to the console for debugging
    console.error('Upload error:', error);
  };

  const handleReset = () => {
    setResults(null);
    setUploadProgress(0);
    setError(null);
  };

  return (
    <section className="py-8 md:py-16 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-viral text-transparent bg-clip-text animate-pulse-gradient">
              Video Virality Analyzer
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload your video and get AI-powered insights on its viral potential. Optimize your content for maximum engagement.
            </p>
          </div>
          
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
                  onUploadStart={handleUploadStart}
                  onUploadProgress={handleUploadProgress}
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                />
              ) : (
                <ResultsDisplay result={results} onReset={handleReset} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;

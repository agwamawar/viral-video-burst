
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import VideoUploader from "@/components/VideoUploader";
import ResultsDisplay from "@/components/ResultsDisplay";
import { ViralityResult } from "@/types/types";

const UploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<ViralityResult | null>(null);

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setResults(null);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadSuccess = (data: ViralityResult) => {
    setIsUploading(false);
    setUploadProgress(100);
    setResults(data);
    toast.success("Analysis complete!");
  };

  const handleUploadError = (error: string) => {
    setIsUploading(false);
    setUploadProgress(0);
    toast.error(`Upload failed: ${error}`);
  };

  const handleReset = () => {
    setResults(null);
    setUploadProgress(0);
  };

  return (
    <section id="upload-section" className="py-16 px-4 sm:px-6 bg-muted">
      <div className="container mx-auto">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">Video Virality Analyzer</CardTitle>
            <CardDescription>
              Upload your video to get AI-powered insights on its viral potential
            </CardDescription>
          </CardHeader>
          <CardContent>
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
    </section>
  );
};

export default UploadSection;

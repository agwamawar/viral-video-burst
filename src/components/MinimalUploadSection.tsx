
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ViralityResult } from "@/types/types";
import { Upload, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const platforms = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Snapchat'];
const analysisTypes = ['Quick Analysis', 'Standard Analysis', 'Deep Analysis'];

const MinimalUploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<ViralityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState(analysisTypes[0]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      toast.info(`Selected file: ${file.name}`);
    }
  };

  const simulateUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          simulateAnalysis();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateAnalysis = () => {
    setTimeout(() => {
      const mockResult: ViralityResult = {
        fileName: selectedFile?.name || 'video.mp4',
        fileSize: selectedFile?.size || 1024000,
        fileSizeFormatted: `${((selectedFile?.size || 1024000) / (1024 * 1024)).toFixed(2)} MB`,
        viralityScore: Math.floor(Math.random() * 100),
        metrics: {
          engagement: Math.floor(Math.random() * 10),
          retention: `${Math.floor(Math.random() * 50) + 50}%`,
          shareability: Math.floor(Math.random() * 10),
          trendAlignment: Math.floor(Math.random() * 10)
        },
        insights: [
          "Good energy throughout the video",
          "Trending topic detected",
          "Lighting could be improved"
        ],
        recommendations: [
          "Add more hashtags",
          "Post during peak hours (6-9pm)",
          "Include a call to action"
        ],
        timestamp: new Date().toISOString()
      };
      
      setIsUploading(false);
      setResults(mockResult);
      toast.success("Analysis complete!");
    }, 1500);
  };

  const handleReset = () => {
    setResults(null);
    setUploadProgress(0);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {error && !results && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Analysis Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {!results ? (
        <Card className="border border-border/50 dark:border-border/30 dark:bg-card/50 backdrop-blur-sm">
          <div className="flex items-center p-2 rounded-md">
            {!selectedFile ? (
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex-grow flex items-center gap-2 p-2 rounded-md hover:bg-muted/30 transition-colors"
              >
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload Your Video</span>
                <input
                  id="file-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="flex-grow flex items-center gap-2 p-2">
                <Upload className="h-5 w-5 text-primary" />
                <span className="text-sm truncate">{selectedFile.name}</span>
              </div>
            )}
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-xs">
                    {selectedPlatform}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {platforms.map(platform => (
                    <DropdownMenuItem
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className="text-xs"
                    >
                      {platform}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-xs">
                    {selectedAnalysisType}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {analysisTypes.map(type => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() => setSelectedAnalysisType(type)}
                      className="text-xs"
                    >
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                onClick={simulateUpload} 
                disabled={isUploading || !selectedFile}
                size="icon"
                variant="ghost"
                className="h-8 w-8"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {isUploading && (
            <div className="px-4 pb-3">
              <div className="w-full bg-muted rounded-full h-1.5 dark:bg-muted/30">
                <div 
                  className="progress-value h-1.5 rounded-full bg-primary" 
                  style={{ width: `${uploadProgress}%` }} 
                />
              </div>
            </div>
          )}
        </Card>
      ) : (
        <ResultsDisplay result={results} onReset={handleReset} />
      )}
    </div>
  );
};

export default MinimalUploadSection;

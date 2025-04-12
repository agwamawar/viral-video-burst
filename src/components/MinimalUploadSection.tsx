
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="max-w-3xl mx-auto">
      <Card className="border-border dark:border-border/50 dark:bg-card/70 backdrop-blur-sm">
        <CardContent className="pt-6">
          {error && !results && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!results ? (
            <div className="space-y-6">
              <div className="text-center">
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/60 transition-all duration-200"
                >
                  <Upload className="h-12 w-12 text-primary/60 mb-4" />
                  <span className="text-xl font-medium mb-2">Upload Your Video</span>
                  <span className="text-sm text-muted-foreground">
                    {selectedFile ? selectedFile.name : "Drag and drop or click to browse"}
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              
              {isUploading && (
                <div className="w-full bg-muted rounded-full h-2.5 dark:bg-muted/30">
                  <div 
                    className="progress-value h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }} 
                  />
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      {selectedPlatform}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {platforms.map(platform => (
                      <DropdownMenuItem
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                      >
                        {platform}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      {selectedAnalysisType}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {analysisTypes.map(type => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => setSelectedAnalysisType(type)}
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  onClick={simulateUpload} 
                  disabled={isUploading || !selectedFile}
                  className="w-full sm:w-auto bg-gradient-viral hover:bg-gradient-viral hover:opacity-90"
                >
                  Analyze
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <ResultsDisplay result={results} onReset={handleReset} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MinimalUploadSection;

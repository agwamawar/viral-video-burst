
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ViralityResult } from "@/types/types";
import { 
  Upload, 
  PlusCircle, 
  ArrowRight,
  ChevronDown,
  Sparkles,
  Share2
} from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const platforms = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Snapchat'];
const analysisTypes = ['Quick Analysis', 'Standard Analysis', 'Deep Analysis'];

const MetamorphicUploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<ViralityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState(analysisTypes[0]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      toast.info(`Selected file: ${file.name}`);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
        <Card className="border border-border/50 dark:border-border/30 dark:bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="flex flex-col">
            {/* Top row - upload button */}
            <div className="flex justify-center items-center p-4 border-b border-border/30">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button 
                onClick={handleUploadClick}
                variant="outline" 
                className={`relative w-full justify-center transition-all duration-300 ${selectedFile ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'}`}
              >
                <Upload className={`h-4 w-4 mr-2 ${selectedFile ? 'text-primary' : 'text-muted-foreground'}`} />
                {selectedFile ? selectedFile.name : "Upload Video"}
              </Button>
            </div>
            
            {/* Bottom row - icons and controls */}
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <TooltipProvider>
                  {/* Add video icon with square border */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-md hover:bg-muted/30 border border-border p-1.5"
                      >
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add additional videos</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Analysis type dropdown with AI icon and text */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 rounded-md hover:bg-muted/30 flex items-center gap-2 px-3">
                            <Sparkles className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Analysis</span>
                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                          {analysisTypes.map(type => (
                            <DropdownMenuItem
                              key={type}
                              className={selectedAnalysisType === type ? "bg-primary/10 text-primary" : ""}
                              onClick={() => setSelectedAnalysisType(type)}
                            >
                              {type}
                              {selectedAnalysisType === type && <ChevronDown className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select analysis type: {selectedAnalysisType}</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Platform dropdown with text */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 rounded-md hover:bg-muted/30 flex items-center gap-2 px-3">
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Platform</span>
                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                          {platforms.map(platform => (
                            <DropdownMenuItem
                              key={platform}
                              className={selectedPlatform === platform ? "bg-primary/10 text-primary" : ""}
                              onClick={() => setSelectedPlatform(platform)}
                            >
                              {platform}
                              {selectedPlatform === platform && <ChevronDown className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select platform: {selectedPlatform}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex items-center">
                {isUploading && (
                  <div className="mr-2 text-xs text-muted-foreground">
                    Analyzing... {uploadProgress}%
                  </div>
                )}
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={simulateUpload} 
                        disabled={isUploading || !selectedFile}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 p-1.5"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Analyze video</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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

export default MetamorphicUploadSection;

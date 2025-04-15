
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UploadCloud, Film, X, Clapperboard, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import MorphingHeader from './MorphingHeader';

const MetamorphicUploadSection = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a video smaller than 100MB.",
        variant: "destructive"
      });
      return;
    }
    
    setFile(file);
  };

  const removeFile = () => {
    setFile(null);
  };

  const analyzeContent = () => {
    setAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalyzing(false);
      navigate("/report");
    }, 2000);
  };

  return (
    <div>
      <MorphingHeader />
      
      <div className="mt-10 max-w-4xl mx-auto">
        <Card className={cn(
          "border-dashed border-2 dark:bg-card/50 backdrop-blur-sm transition-all duration-300",
          dragging ? "border-primary bg-primary/5" : "border-border/50",
          file ? "border-solid" : "border-dashed"
        )}>
          {!file ? (
            <CardContent 
              className="p-10 flex flex-col items-center justify-center gap-4"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <UploadCloud className="h-10 w-10 text-primary" />
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Upload your video</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your video file here, or click to browse
                </p>
                
                <div className="flex flex-col gap-2 items-center">
                  <Button className="relative bg-gradient-viral hover:bg-gradient-viral hover:opacity-90">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={handleFileInput}
                      accept="video/*"
                    />
                    <Film className="mr-2 h-4 w-4" />
                    Browse for Video
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    Supported formats: MP4, MOV, AVI, etc. (Max 100MB)
                  </p>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clapperboard className="h-7 w-7 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{file.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full bg-gradient-viral hover:bg-gradient-viral hover:opacity-90"
                  onClick={analyzeContent}
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <>Analyzing Video<span className="loading-dots ml-2">...</span></>
                  ) : (
                    <>
                      Generate Virality Report
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MetamorphicUploadSection;

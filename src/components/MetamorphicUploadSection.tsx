
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import MorphingHeader from './MorphingHeader';

const MetamorphicUploadSection: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            description: "Upload complete! Analyzing your content...",
          });
          setTimeout(() => navigate('/virality-report'), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <MorphingHeader />
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upload Your Content</CardTitle>
          <CardDescription>
            Upload your video content to get a detailed virality analysis and performance prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <p className="mb-4 text-lg">Drag & drop your video file here or click to browse</p>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button className="cursor-pointer">
                Select Video
              </Button>
            </label>
          </div>
          
          {isUploading && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Uploading... {uploadProgress}%</p>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">Supported formats: MP4, MOV, AVI (Max 1GB)</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MetamorphicUploadSection;

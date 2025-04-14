import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload,
  Plus,
  Brain,
  Share2,
  ArrowRight,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { mockVideoAnalysis } from "@/lib/mockApi";
import { ViralityResult } from "@/types/types";


const analysisTypes = [
  { id: 'quick', name: 'Quick Analysis', duration: '~1 min' },
  { id: 'standard', name: 'Standard Analysis', duration: '~3 mins' },
  { id: 'deep', name: 'Deep Analysis', duration: '~5 mins' }
];

const platforms = [
  { id: 'youtube', name: 'YouTube' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'instagram', name: 'Instagram' }
];

interface VideoUploaderProps {
  isUploading: boolean;
  progress: number;
  onUploadStart: () => void;
  onUploadProgress: (progress: number) => void;
  onUploadSuccess: (data: ViralityResult) => void;
  onUploadError: (error: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  isUploading,
  progress,
  onUploadStart,
  onUploadProgress,
  onUploadSuccess,
  onUploadError
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(analysisTypes[0]);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { toast } = useToast();


  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      onUploadError('Please select at least one video');
      setUploadError('Please select at least one video');
      toast({ title: 'No files selected', description: 'Please select at least one video', variant: 'destructive' });
      return;
    }
    setUploadError(null); //reset error
    onUploadStart();

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 95) {
        clearInterval(interval);
        currentProgress = 95;
      }
      onUploadProgress(currentProgress);
    }, 300);

    try {
      //Simulate multiple file upload
      const promises = selectedFiles.map(file => mockVideoAnalysis(file));
      const results = await Promise.all(promises);
      clearInterval(interval);
      onUploadSuccess({results, analysisType: selectedAnalysis, platform: selectedPlatform}); // Pass additional data

    } catch (error) {
      clearInterval(interval);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred during video analysis';
      setUploadError(errorMessage);
      onUploadError(errorMessage);
      toast({ title: "Analysis Failed", description: errorMessage, variant: "destructive" });
      console.error('Video analysis failed:', error);
    }
  };

  return (
    <div className="rounded-lg border-2 border-dashed p-4 transition-all w-full max-w-[90vw] md:max-w-[160vw] lg:max-w-[140vw] mx-auto">
      {/* Top Row */}
      <div className="flex justify-center mb-4">
        <Button 
          onClick={() => fileInputRef.current?.click()}
          className="h-16 px-8 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          disabled={isUploading}
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload Video
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept="video/*"
          multiple
        />
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          {/* Add Videos Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add more videos for A/B testing</TooltipContent>
          </Tooltip>

          {/* Analysis Type Selector */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    disabled={isUploading}
                  >
                    <Brain className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Select analysis type</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              {analysisTypes.map(type => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => setSelectedAnalysis(type)}
                >
                  {type.name} ({type.duration})
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Platform Selector */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    disabled={isUploading}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Select target platform</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              {platforms.map(platform => (
                <DropdownMenuItem
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform)}
                >
                  {platform.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Submit Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className={cn(
                "h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600",
                isUploading && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleUpload}
              disabled={isUploading || selectedFiles.length === 0}
            >
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Start analysis</TooltipContent>
        </Tooltip>
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <Progress 
          value={progress} 
          className="h-2 mt-4" 
        />
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          {selectedFiles.length} video(s) selected
        </div>
      )}
      {uploadError && (
        <div className="mt-2 text-red-500 text-sm">{uploadError}</div>
      )}
    </div>
  );
};

export default VideoUploader;
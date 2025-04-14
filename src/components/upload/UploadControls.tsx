import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight, ChevronDown, Sparkles, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UploadControlsProps {
  selectedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  simulateUpload: () => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  selectedAnalysisType: string;
  setSelectedAnalysisType: (type: string) => void;
}

const platforms = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Snapchat'];
const analysisTypes = ['Quick Analysis', 'Standard Analysis', 'Deep Analysis'];

const UploadControls: React.FC<UploadControlsProps> = ({
  selectedFile,
  isUploading,
  uploadProgress,
  simulateUpload,
  selectedPlatform,
  setSelectedPlatform,
  selectedAnalysisType,
  setSelectedAnalysisType,
}) => {
  return (
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
                    <span className="text-sm">{selectedAnalysisType}</span>
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
              <p>Selected: {selectedAnalysisType}</p>
            </TooltipContent>
          </Tooltip>

          {/* Platform dropdown with text */}
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 rounded-md hover:bg-muted/30 flex items-center gap-2 px-3">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedPlatform}</span>
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
  );
};

export default UploadControls;

import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlatformSelectorProps {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

const platforms = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Snapchat'];

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  selectedPlatform, 
  setSelectedPlatform 
}) => {
  return (
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
  );
};

export default PlatformSelector;

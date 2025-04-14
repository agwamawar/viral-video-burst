
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnalysisTypeSelectorProps {
  selectedAnalysisType: string;
  setSelectedAnalysisType: (type: string) => void;
}

const analysisTypes = ['Quick Analysis', 'Standard Analysis', 'Deep Analysis'];

const AnalysisTypeSelector: React.FC<AnalysisTypeSelectorProps> = ({ 
  selectedAnalysisType, 
  setSelectedAnalysisType 
}) => {
  return (
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
  );
};

export default AnalysisTypeSelector;

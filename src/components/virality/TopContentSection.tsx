
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CheckSquare, Sparkles, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimilarityMetricProps {
  label: string;
  percentage: number;
  icon: React.ReactNode;
}

const SimilarityMetric: React.FC<SimilarityMetricProps> = ({ label, percentage, icon }) => (
  <div className="space-y-1 mb-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="font-medium text-sm">{label}</h4>
      </div>
      <span className="text-sm font-medium">{percentage}%</span>
    </div>
    <Progress value={percentage} className="h-2" />
  </div>
);

interface ChecklistItemProps {
  text: string;
  checked: boolean;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ text, checked }) => (
  <div className={`flex items-center gap-2 p-2 rounded-md ${checked ? 'bg-primary/10' : 'bg-muted/20'}`}>
    <CheckSquare className={`h-4 w-4 ${checked ? 'text-primary' : 'text-muted-foreground'}`} />
    <span className={`text-sm ${checked ? 'font-medium' : ''}`}>{text}</span>
  </div>
);

interface UniquePointProps {
  text: string;
}

const UniquePoint: React.FC<UniquePointProps> = ({ text }) => (
  <div className="flex items-start gap-2 group">
    <div className="h-5 w-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5">
      <Sparkles className="h-3 w-3" />
    </div>
    <p className="text-sm">{text}</p>
  </div>
);

interface TopContentSectionProps {
  similarities: {
    concept: number;
    execution: number;
  };
  missingElements: Array<{text: string; present: boolean}>;
  uniqueElements: string[];
  performanceRange: string;
}

const TopContentSection: React.FC<TopContentSectionProps> = ({ 
  similarities, 
  missingElements, 
  uniqueElements,
  performanceRange
}) => {
  return (
    <Card className="border-border/50 dark:bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">Similar Content – Benchmarking Against Top Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-primary" />
              Content Similarity
            </h4>
            <SimilarityMetric 
              label="Content Concept Similarity" 
              percentage={similarities.concept} 
              icon={<Lightbulb className="h-4 w-4 text-primary" />}
            />
            <SimilarityMetric 
              label="Execution Quality Similarity" 
              percentage={similarities.execution} 
              icon={<Award className="h-4 w-4 text-primary" />}
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
              <CheckSquare className="h-4 w-4 text-primary" />
              What's Missing?
            </h4>
            <div className="space-y-2">
              {missingElements.map((item, index) => (
                <ChecklistItem key={index} text={item.text} checked={item.present} />
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              What's Unique?
            </h4>
            <div className="space-y-2">
              {uniqueElements.map((text, index) => (
                <UniquePoint key={index} text={text} />
              ))}
            </div>
          </div>
          
          <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              Predicted Performance Range
            </h4>
            <p className="text-sm text-muted-foreground">{performanceRange}</p>
          </div>
          
          <Button className="w-full bg-gradient-viral hover:bg-gradient-viral hover:opacity-90">
            View Top Performing Content Examples
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopContentSection;

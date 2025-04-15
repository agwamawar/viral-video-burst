
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressDisplay } from "@/components/CircularProgressDisplay";
import { Check, Flame, ArrowRight, Lightbulb } from "lucide-react";

interface MetricRangeProps {
  label: string;
  range: string;
  icon?: React.ReactNode;
}

const MetricRange: React.FC<MetricRangeProps> = ({ label, range, icon }) => (
  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded">{range}</span>
  </div>
);

interface SuggestionProps {
  text: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ text }) => (
  <div className="flex items-start gap-2 group">
    <div className="h-5 w-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5">
      <Lightbulb className="h-3 w-3" />
    </div>
    <p className="text-sm">{text}</p>
  </div>
);

interface ViralityMetricsSectionProps {
  score: number;
  metrics: {
    views: string;
    likes: string;
    shares: string;
    comments: string;
  };
  suggestions: string[];
}

const ViralityMetricsSection: React.FC<ViralityMetricsSectionProps> = ({ 
  score, 
  metrics, 
  suggestions 
}) => {
  return (
    <Card className="border-border/50 dark:bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Flame className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">Virality Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
          <div className="relative">
            <CircularProgressDisplay 
              score={score} 
              size={120} 
              strokeWidth={10}
              className="drop-shadow-md"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{score}%</span>
              <span className="text-xs text-muted-foreground">Virality Score</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <MetricRange label="Expected Views" range={metrics.views} icon={<Check className="h-4 w-4 text-primary" />} />
            <MetricRange label="Expected Likes" range={metrics.likes} icon={<Check className="h-4 w-4 text-primary" />} />
            <MetricRange label="Expected Shares" range={metrics.shares} icon={<Check className="h-4 w-4 text-primary" />} />
            <MetricRange label="Expected Comments" range={metrics.comments} icon={<Check className="h-4 w-4 text-primary" />} />
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium mb-3 flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-primary" />
            AI-Powered Suggestions
          </h4>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <Suggestion key={index} text={suggestion} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViralityMetricsSection;

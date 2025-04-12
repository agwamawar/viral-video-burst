
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgressDisplay } from "@/components/CircularProgressDisplay";
import { ViralityResult } from "@/types/types";
import { BarChart, Calendar, DownloadCloud, Repeat, Trophy, Share2, Copy, ChevronRight, CheckCheck, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
  result: ViralityResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const text = `Virality Score: ${result.viralityScore}/100
Key Insights:
${result.insights.join('\n')}
Recommendations:
${result.recommendations.join('\n')}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getScoreLabel = () => {
    if (result.viralityScore < 40) return 'Low Viral Potential';
    if (result.viralityScore < 70) return 'Moderate Viral Potential';
    return 'High Viral Potential';
  };

  const getScoreColor = () => {
    if (result.viralityScore < 40) return 'text-red-500 dark:text-red-400';
    if (result.viralityScore < 70) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-green-500 dark:text-green-400';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative">
            <CircularProgressDisplay 
              score={result.viralityScore} 
              size={130} 
              strokeWidth={12}
              className="drop-shadow-md"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-viral text-white rounded-full p-1.5">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className={cn("text-2xl font-bold", getScoreColor())}>
              {getScoreLabel()}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 mb-2">
              {result.fileName} • {result.fileSizeFormatted}
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs flex gap-1"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Results
                  </>
                )}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs flex gap-1"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <Repeat className="h-4 w-4" />
          Analyze Another Video
        </Button>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <BarChart className="h-4 w-4 mr-2" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Lightbulb className="h-4 w-4 mr-2" />
            <span>Insights</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <DownloadCloud className="h-4 w-4 mr-2" />
            <span>Recommendations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-border/50 dark:bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">Key Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(result.metrics).map(([key, value]) => (
                  <div key={key} className="p-4 bg-muted/50 dark:bg-muted/20 rounded-lg text-center hover:bg-muted transition-colors">
                    <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="border-border/50 dark:bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">Content Insights</h4>
              <ul className="space-y-4">
                {result.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-gradient-viral flex-shrink-0 flex items-center justify-center text-white text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1 p-3 rounded-lg border border-border/50 bg-muted/20 group-hover:bg-muted/40 transition-colors">
                      <p>{insight}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="border-border/50 dark:bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">Optimization Recommendations</h4>
              <ul className="space-y-4">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="group">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1 p-3 rounded-lg border border-border/50 bg-muted/20 group-hover:bg-muted/40 transition-colors group-hover:border-primary/20">
                        <p>{recommendation}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Button className="w-full mt-4 bg-gradient-viral hover:bg-gradient-viral hover:opacity-90">
            Get Detailed Optimization Plan
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;

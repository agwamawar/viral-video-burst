
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgressDisplay } from "@/components/CircularProgressDisplay";
import { ViralityResult } from "@/types/types";
import { BarChart, Calendar, DownloadCloud, Repeat } from "lucide-react";

interface ResultsDisplayProps {
  result: ViralityResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CircularProgressDisplay 
          score={result.viralityScore} 
          size={120} 
          strokeWidth={10}
        />
        <h3 className="text-xl font-semibold mt-4">
          {result.viralityScore < 40 ? 'Low Viral Potential' : 
           result.viralityScore < 70 ? 'Moderate Viral Potential' : 
           'High Viral Potential'}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {result.fileName} • {result.fileSizeFormatted}
        </p>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <DownloadCloud className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Recommendations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(result.metrics).map(([key, value]) => (
                  <div key={key} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {result.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-gradient-viral flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5">
                      {index + 1}
                    </div>
                    <p>{insight}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5">
                      {index + 1}
                    </div>
                    <p>{recommendation}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <Repeat className="h-4 w-4" />
          Analyze Another Video
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

const ViralityMetricsSection = () => {
  const viralityScore = 83;
  
  const aiSuggestions = [
    "Add a more surprising hook in the first 3 seconds",
    "Include a clearer call-to-action at the end",
    "Consider adding text overlay to highlight key points",
    "Use more trending audio to boost algorithm performance",
    "Increase emotional appeal with personal storytelling"
  ];
  
  const expectedRanges = [
    { metric: 'Views', range: '10K-30K' },
    { metric: 'Likes', range: '1.2K-3.8K' },
    { metric: 'Shares', range: '200-600' },
    { metric: 'Comments', range: '80-240' }
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <span role="img" aria-label="fire" className="text-2xl">🔥</span> 
          Virality Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Total Virality Score</h3>
              <span className="text-2xl font-bold">{viralityScore}%</span>
            </div>
            <Progress value={viralityScore} className="h-3" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">AI-Powered Suggestions:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index} className="text-sm">{suggestion}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Expected Performance Range:</h4>
            <div className="grid grid-cols-2 gap-3">
              {expectedRanges.map((item) => (
                <div key={item.metric} className="bg-amber-50 p-3 rounded-md">
                  <p className="text-sm font-medium">{item.metric}</p>
                  <p className="text-lg font-bold">{item.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViralityMetricsSection;

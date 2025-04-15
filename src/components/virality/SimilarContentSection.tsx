
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { CheckSquare, XSquare } from 'lucide-react';

const SimilarContentSection = () => {
  const similarityMetrics = [
    { 
      name: 'Content Concept Similarity', 
      score: 78,
      description: 'How closely the core concept matches viral content'
    },
    { 
      name: 'Execution Quality Similarity', 
      score: 65,
      description: 'How the production quality compares to viral content'
    },
  ];
  
  const missing = [
    "Pattern interrupts to regain viewer attention",
    "Strong emotional triggers in the middle section",
    "Platform-specific optimization techniques",
    "Clearer audience targeting signals"
  ];
  
  const unique = [
    "Novel presentation of common concept",
    "Authentic personality elements",
    "Creative use of trending audio",
    "Unexpected ending that encourages rewatching"
  ];
  
  const performanceRange = {
    views: "65-85%",
    engagement: "70-90%",
    description: "Your content is likely to perform at 65-85% of the average viral video in this category based on our analysis."
  };

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <span role="img" aria-label="chart" className="text-2xl">📊</span> 
          Similar Content Benchmarking
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-5">
          {similarityMetrics.map((metric) => (
            <div key={metric.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{metric.name}</span>
                <span className="text-sm font-bold">{metric.score}%</span>
              </div>
              <Progress value={metric.score} className="h-2" />
              <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
            </div>
          ))}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <h4 className="flex items-center gap-1 font-medium text-sm mb-2">
                <XSquare className="h-4 w-4 text-red-500" />
                What's Missing?
              </h4>
              <ul className="space-y-1">
                {missing.map((item, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="flex items-center gap-1 font-medium text-sm mb-2">
                <CheckSquare className="h-4 w-4 text-green-500" />
                What's Unique?
              </h4>
              <ul className="space-y-1">
                {unique.map((item, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-2">
            <h4 className="font-medium text-sm mb-2">Predicted Performance Range</h4>
            <div className="bg-emerald-50 p-3 rounded-md">
              <div className="flex justify-between">
                <span className="text-sm">Views vs. Top Content:</span>
                <span className="font-bold">{performanceRange.views}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-sm">Engagement Rate:</span>
                <span className="font-bold">{performanceRange.engagement}</span>
              </div>
              <p className="text-sm mt-2">{performanceRange.description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarContentSection;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { TrendingUp, Heart, ZapIcon, Share2 } from 'lucide-react';

const ConceptSection = () => {
  const conceptFactors = [
    {
      name: 'Trend Alignment',
      score: 85,
      icon: TrendingUp,
      details: 'Content aligns with trending topics on social media platforms',
    },
    {
      name: 'Psychological & Emotional Appeal',
      score: 78,
      icon: Heart,
      details: 'Strong emotional triggers that increase sharing behavior',
    },
    {
      name: 'Hook & Retention Power',
      score: 92,
      icon: ZapIcon,
      details: 'Opens with strong hook, maintains viewer attention throughout',
    },
    {
      name: 'Uniqueness & Shareability',
      score: 76,
      icon: Share2,
      details: 'Offers unique perspective that stands out from similar content',
    },
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <span role="img" aria-label="brain" className="text-2xl">🧠</span> 
          Concept – The Core of Virality (70%)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {conceptFactors.map((factor) => (
            <div key={factor.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <factor.icon className="h-4 w-4 text-indigo-600" />
                  <span className="font-medium">{factor.name}</span>
                </div>
                <span className="text-sm font-bold">{factor.score}%</span>
              </div>
              <Progress value={factor.score} className="h-2" />
              <p className="text-sm text-gray-500 mt-1">{factor.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptSection;

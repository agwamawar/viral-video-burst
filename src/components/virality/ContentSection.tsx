
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Film, Music, Layout } from 'lucide-react';

const ContentSection = () => {
  const contentFactors = [
    {
      name: 'Editing & Visual Quality',
      score: 82,
      icon: Film,
      details: 'Professional-grade editing with smooth transitions',
    },
    {
      name: 'Audio & Sound Design',
      score: 75,
      icon: Music,
      details: 'Clear audio quality with effective background music',
    },
    {
      name: 'Format & Platform Optimization',
      score: 90,
      icon: Layout,
      details: 'Format optimized for the target platform algorithms',
    },
  ];

  const tags = ['Has Subtitles', 'Trending Audio', '9:16 Ratio', 'Captions', 'Text Overlay'];

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <span role="img" aria-label="movie" className="text-2xl">🎬</span> 
          Content – Enhancing the Concept (30%)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {contentFactors.map((factor) => (
            <div key={factor.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <factor.icon className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{factor.name}</span>
                </div>
                <span className="text-sm font-bold">{factor.score}%</span>
              </div>
              <Progress value={factor.score} className="h-2" />
              <p className="text-sm text-gray-500 mt-1">{factor.details}</p>
            </div>
          ))}

          <div className="pt-3">
            <h4 className="text-sm font-medium mb-2">Content Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentSection;

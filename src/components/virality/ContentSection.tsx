
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Film, Music, Layout, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContentFactorProps {
  name: string;
  score: number;
  description: string;
  icon: React.ReactNode;
}

const ContentFactor: React.FC<ContentFactorProps> = ({ name, score, description, icon }) => (
  <div className="space-y-2 mb-4">
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{name}</h4>
          <span className="text-sm font-medium">{score}%</span>
        </div>
        <Progress value={score} className="h-2 mt-1" />
      </div>
    </div>
    <p className="text-sm text-muted-foreground pl-10">{description}</p>
  </div>
);

interface ContentTag {
  label: string;
  positive: boolean;
}

interface ContentSectionProps {
  factors: {
    visualQuality: number;
    audioQuality: number;
    formatOptimization: number;
  };
  tags: ContentTag[];
  sectionWeight: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({ factors, tags, sectionWeight }) => {
  const factorData = [
    {
      name: "Editing & Visual Quality",
      score: factors.visualQuality,
      description: "The professional quality and visual appeal of your content.",
      icon: <Palette className="h-4 w-4" />
    },
    {
      name: "Audio & Sound Design",
      score: factors.audioQuality,
      description: "The clarity, quality and effective use of audio elements.",
      icon: <Music className="h-4 w-4" />
    },
    {
      name: "Format & Platform Optimization",
      score: factors.formatOptimization,
      description: "How well your content is optimized for the platform's preferences.",
      icon: <Layout className="h-4 w-4" />
    }
  ];

  return (
    <Card className="border-border/50 dark:bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Film className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">Content – Enhancing the Concept</CardTitle>
        <span className="text-sm text-muted-foreground ml-auto font-normal">{sectionWeight}% of score</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {factorData.map((factor) => (
            <ContentFactor
              key={factor.name}
              name={factor.name}
              score={factor.score}
              description={factor.description}
              icon={factor.icon}
            />
          ))}
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Content Features
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant={tag.positive ? "default" : "outline"}
                  className={tag.positive ? "bg-primary/80" : ""}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentSection;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, Heart, Zap, Fingerprint } from "lucide-react";

interface FactorItemProps {
  name: string;
  score: number;
  description: string;
  icon: React.ReactNode;
}

const FactorItem: React.FC<FactorItemProps> = ({ name, score, description, icon }) => (
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

interface ConceptSectionProps {
  factors: {
    trendAlignment: number;
    emotionalAppeal: number;
    hookPower: number;
    uniqueness: number;
  };
  sectionWeight: number;
}

const ConceptSection: React.FC<ConceptSectionProps> = ({ factors, sectionWeight }) => {
  const factorData = [
    {
      name: "Trend Alignment",
      score: factors.trendAlignment,
      description: "How well your content aligns with current trends and audience interests.",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      name: "Psychological & Emotional Appeal",
      score: factors.emotionalAppeal,
      description: "The emotional impact and psychological engagement your content creates.",
      icon: <Heart className="h-4 w-4" />
    },
    {
      name: "Hook & Retention Power",
      score: factors.hookPower,
      description: "How effectively your content grabs and keeps viewer attention.",
      icon: <Zap className="h-4 w-4" />
    },
    {
      name: "Uniqueness & Shareability",
      score: factors.uniqueness,
      description: "The distinctiveness of your content and likelihood of being shared.",
      icon: <Fingerprint className="h-4 w-4" />
    }
  ];

  return (
    <Card className="border-border/50 dark:bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Lightbulb className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">Concept – The Core of Virality</CardTitle>
        <span className="text-sm text-muted-foreground ml-auto font-normal">{sectionWeight}% of score</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {factorData.map((factor) => (
            <FactorItem
              key={factor.name}
              name={factor.name}
              score={factor.score}
              description={factor.description}
              icon={factor.icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptSection;

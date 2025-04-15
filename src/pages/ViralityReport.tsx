
import React from 'react';
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ConceptSection from "@/components/virality/ConceptSection";
import ContentSection from "@/components/virality/ContentSection";
import ViralityMetricsSection from "@/components/virality/ViralityMetricsSection";
import TopContentSection from "@/components/virality/TopContentSection";

const mockData = {
  fileName: "beach_sunset_dance.mp4",
  fileSize: 24500000,
  fileSizeFormatted: "24.5 MB",
  timestamp: new Date().toISOString(),
  
  concept: {
    trendAlignment: 85,
    emotionalAppeal: 78,
    hookPower: 92,
    uniqueness: 70
  },
  
  content: {
    visualQuality: 88,
    audioQuality: 75,
    formatOptimization: 90
  },
  
  contentTags: [
    { label: "Has Subtitles", positive: true },
    { label: "Trending Audio", positive: true },
    { label: "9:16 Ratio", positive: true },
    { label: "Good Lighting", positive: true },
    { label: "Clear Audio", positive: true },
    { label: "60FPS", positive: false },
    { label: "HDR", positive: false }
  ],
  
  viralityScore: 82,
  
  metrics: {
    views: "10K–30K",
    likes: "1.2K–3.5K",
    shares: "200–500",
    comments: "80–150"
  },
  
  suggestions: [
    "Add a more surprising reveal in the first 3 seconds to boost hook power",
    "Consider using trending sound #8832 which has 87% higher engagement",
    "Add captions for key phrases to improve accessibility and engagement",
    "Brighten the color grading by 15% to match current trending aesthetics"
  ],
  
  similarities: {
    concept: 73,
    execution: 68
  },
  
  missingElements: [
    { text: "Pattern interruption at 5-second mark", present: false },
    { text: "Text overlay highlights", present: true },
    { text: "Satisfying resolution/payoff", present: true },
    { text: "Trending hashtag inclusion", present: false },
    { text: "Creator personality showcase", present: true }
  ],
  
  uniqueElements: [
    "Creative transition sequence that stands out from similar content",
    "Authentic emotional connection established through genuine reactions",
    "Original sound variation that enhances the standard trending audio"
  ],
  
  performanceRange: "Your content is likely to perform 65-75% as well as the top 1% of similar content in this category, with potential for higher performance if suggestions are implemented."
};

const ViralityReport: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SonnerToaster position="top-center" />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <main className="flex-grow px-2 sm:px-4 py-6 mx-auto flex flex-col gap-2 w-full max-w-7xl">
              <div className="px-4 flex items-center mb-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1" 
                  asChild
                >
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Upload
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold ml-4">Virality Report</h1>
                <div className="ml-auto text-sm text-muted-foreground">
                  {mockData.fileName} • {mockData.fileSizeFormatted}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                <ConceptSection 
                  factors={mockData.concept} 
                  sectionWeight={70} 
                />
                
                <ContentSection 
                  factors={mockData.content} 
                  tags={mockData.contentTags} 
                  sectionWeight={30} 
                />
                
                <ViralityMetricsSection 
                  score={mockData.viralityScore} 
                  metrics={mockData.metrics} 
                  suggestions={mockData.suggestions} 
                />
                
                <TopContentSection 
                  similarities={mockData.similarities} 
                  missingElements={mockData.missingElements} 
                  uniqueElements={mockData.uniqueElements} 
                  performanceRange={mockData.performanceRange} 
                />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ViralityReport;

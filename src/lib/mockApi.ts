
import { ViralityResult } from "@/types/types";

// Simulate a video analysis API call
export const mockVideoAnalysis = async (file: File): Promise<ViralityResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate a random virality score between 30 and 95
  const viralityScore = Math.floor(Math.random() * 65) + 30;
  
  // Generate random metrics
  const engagement = Math.floor(Math.random() * 10) + 1;
  const retention = Math.floor(Math.random() * 50) + 50;
  const shareability = Math.floor(Math.random() * 10) + 1;
  const trendAlignment = Math.floor(Math.random() * 10) + 1;
  
  // Format file size
  const fileSizeFormatted = formatFileSize(file.size);

  // Generate insights based on score
  const insights = generateInsights(viralityScore);
  
  // Generate recommendations based on metrics
  const recommendations = generateRecommendations({
    engagement, retention, shareability, trendAlignment
  });

  return {
    fileName: file.name,
    fileSize: file.size,
    fileSizeFormatted,
    viralityScore,
    metrics: {
      engagement, 
      retention: `${retention}%`, 
      shareability, 
      trendAlignment
    },
    insights,
    recommendations,
    timestamp: new Date().toISOString()
  };
};

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

// Generate insights based on the virality score
const generateInsights = (score: number): string[] => {
  const lowInsights = [
    "Your video has limited viral potential at this time.",
    "The content may be too niche for broad appeal.",
    "The pacing is slower than most viral content.",
    "The video lacks a strong hook in the first 3 seconds."
  ];
  
  const mediumInsights = [
    "Your video shows moderate viral potential.",
    "The content has some engaging elements that could drive shares.",
    "The first 10 seconds have good retention potential.",
    "The subject matter aligns with some current trends."
  ];
  
  const highInsights = [
    "Your video has strong viral potential!",
    "The content includes elements common to viral videos.",
    "The pacing and editing are optimized for short attention spans.",
    "The hook in the first 3 seconds is likely to capture audience attention."
  ];
  
  if (score < 40) return lowInsights;
  if (score < 70) return mediumInsights;
  return highInsights;
};

// Generate recommendations based on metrics
const generateRecommendations = (metrics: any): string[] => {
  const recommendations = [];
  
  if (metrics.engagement < 5) {
    recommendations.push("Add more interactive elements or questions to increase engagement.");
    recommendations.push("Include a clear call-to-action to encourage viewer participation.");
  }
  
  if (metrics.retention < 70) {
    recommendations.push("Shorten the video to keep viewers' attention throughout.");
    recommendations.push("Add visual elements every 2-3 seconds to maintain interest.");
  }
  
  if (metrics.shareability < 5) {
    recommendations.push("Add an element of surprise or emotional appeal to increase shareability.");
    recommendations.push("Include content that viewers would share to express their identity.");
  }
  
  if (metrics.trendAlignment < 5) {
    recommendations.push("Incorporate current trending topics or sounds in your content.");
    recommendations.push("Use popular hashtags relevant to your content.");
  }
  
  // Add general recommendations if we don't have enough specific ones
  if (recommendations.length < 3) {
    recommendations.push("Post your video when your audience is most active.");
    recommendations.push("Create a compelling thumbnail that sparks curiosity.");
  }
  
  return recommendations.slice(0, 5); // Return a maximum of 5 recommendations
};

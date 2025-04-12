
// Core types for the BlowUp AI application

export interface ViralityResult {
  fileName: string;
  fileSize: number;
  fileSizeFormatted: string;
  viralityScore: number;
  metrics: {
    engagement: number | string;
    retention: string;
    shareability: number | string;
    trendAlignment: number | string;
  };
  insights: string[];
  recommendations: string[];
  timestamp: string;
}

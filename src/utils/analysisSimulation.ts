
import { toast } from "sonner";
import { ViralityResult } from "@/types/types";

export const simulateAnalysis = (
  selectedFile: File | null,
  setIsUploading: (value: boolean) => void,
  setResults: (result: ViralityResult) => void
): void => {
  setTimeout(() => {
    const mockResult: ViralityResult = {
      fileName: selectedFile?.name || 'video.mp4',
      fileSize: selectedFile?.size || 1024000,
      fileSizeFormatted: `${((selectedFile?.size || 1024000) / (1024 * 1024)).toFixed(2)} MB`,
      viralityScore: Math.floor(Math.random() * 100),
      metrics: {
        engagement: Math.floor(Math.random() * 10),
        retention: `${Math.floor(Math.random() * 50) + 50}%`,
        shareability: Math.floor(Math.random() * 10),
        trendAlignment: Math.floor(Math.random() * 10)
      },
      insights: [
        "Good energy throughout the video",
        "Trending topic detected",
        "Lighting could be improved"
      ],
      recommendations: [
        "Add more hashtags",
        "Post during peak hours (6-9pm)",
        "Include a call to action"
      ],
      timestamp: new Date().toISOString()
    };
    
    setIsUploading(false);
    setResults(mockResult);
    toast.success("Analysis complete!");
  }, 1500);
};

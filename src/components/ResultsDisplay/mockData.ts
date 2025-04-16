
// Mock data for content analysis results
export const mockResultsData = {
  concept: {
    overallScore: 82,
    insights: [
      { name: "Emotional Pull", score: 87, description: "Your concept resonates emotionally with your audience" },
      { name: "Clarity", score: 76, description: "Your main idea is clear, but could be more concise" },
      { name: "Uniqueness", score: 92, description: "Stands out from similar content in your niche" },
      { name: "Audience Relevance", score: 84, description: "Highly relevant to your target audience" }
    ],
    feedback: "Your concept has strong emotional pull and uniqueness. Focus on making your main idea even clearer for maximum impact."
  },
  content: {
    overallScore: 78,
    elements: [
      { name: "Structure", score: 81, tip: "Your content flow is logical and easy to follow" },
      { name: "Pacing", score: 67, tip: "Consider tightening the middle section to maintain engagement" },
      { name: "Visual Quality", score: 90, tip: "Great visual coherence that supports your message" },
      { name: "Storytelling", score: 75, tip: "Your story arc works well but could have a stronger conclusion" }
    ],
    topTip: "Your intro grabs attention effectively - leverage this strength by ensuring your conclusion leaves an equally strong impression."
  },
  virality: {
    overallScore: 84,
    viralFactors: [
      { name: "Hook Strength 🔥", score: 92, description: "Your opening hook is compelling and scroll-stopping" },
      { name: "Save-ability 📌", score: 76, description: "Good value but could be more reference-worthy" },
      { name: "Wow Moment ✨", detected: true, timestamp: "01:45", description: "Strong surprise element midway that drives engagement" },
      { name: "Share Triggers", score: 88, description: "Content includes multiple reasons for viewers to share" },
      { name: "Platform Alignment", score: 79, description: "Well-aligned with platform algorithm preferences" }
    ],
    projection: "This content has strong viral potential with particularly effective hook and share triggers."
  },
  compare: {
    percentileBetter: 80,
    metrics: [
      { name: "Engagement Rate", yours: 8.4, nicheBenchmark: 5.7, better: true },
      { name: "Retention Score", yours: 67, nicheBenchmark: 58, better: true },
      { name: "Call-to-Action", yours: 74, nicheBenchmark: 82, better: false },
      { name: "Originality", yours: 86, nicheBenchmark: 72, better: true }
    ],
    insight: "You're outperforming 80% of creators in your niche, particularly in engagement and originality. Your CTA effectiveness has room for improvement."
  }
};

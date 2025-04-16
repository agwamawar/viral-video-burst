
import { ResultsData } from "../types/resultsTypes";

export const mockResultsData: ResultsData = {
  concept: {
    overallScore: 87,
    emotionalPull: 92,
    clarity: 85,
    uniqueness: 78,
    audienceRelevance: 94,
    feedback: [
      "Your concept has exceptional emotional resonance",
      "The core message comes through clearly",
      "Consider highlighting what makes your approach unique",
      "Perfect alignment with your target audience's interests"
    ]
  },
  content: {
    overallScore: 83,
    structure: 88,
    pacing: 76,
    visualQuality: 92,
    storytelling: 85,
    tips: {
      positive: [
        "Your intro immediately grabs attention",
        "Visuals are professional and on-brand",
        "Personal stories create authentic connection",
        "Your call-to-action is clear and compelling"
      ],
      improvements: [
        "Consider tightening up the middle section",
        "Try varying your pacing to maintain engagement",
        "Add one more concrete example to strengthen your point"
      ]
    }
  },
  virality: {
    overallScore: 79,
    hookStrength: 92,
    shareability: 85,
    saveability: 78,
    platformAlignment: 73,
    wowMoments: [
      {
        detected: true,
        timestamp: "0:45",
        description: "The unexpected reveal creates a shareable moment"
      },
      {
        detected: true,
        timestamp: "2:12",
        description: "Your authentic reaction is highly relatable"
      }
    ],
    viralPotential: "High"
  },
  compare: {
    percentileBetter: 82,
    strengths: [
      "More authentic storytelling than 90% of your niche",
      "Higher audience engagement potential",
      "Stronger emotional connection"
    ],
    opportunities: [
      "Top performers have more concise messaging",
      "Consider adding more practical takeaways"
    ],
    topPerformerGap: 8,
    nicheAverage: 71,
    yourScore: 83
  }
};

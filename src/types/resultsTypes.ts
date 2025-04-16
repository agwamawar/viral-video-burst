
export interface ConceptResult {
  overallScore: number;
  emotionalPull: number;
  clarity: number;
  uniqueness: number;
  audienceRelevance: number;
  feedback: string[];
}

export interface ContentResult {
  overallScore: number;
  structure: number;
  pacing: number;
  visualQuality: number;
  storytelling: number;
  tips: {
    positive: string[];
    improvements: string[];
  };
}

export interface ViralityResult {
  overallScore: number;
  hookStrength: number;
  shareability: number;
  saveability: number;
  platformAlignment: number;
  wowMoments: {
    detected: boolean;
    timestamp?: string;
    description?: string;
  }[];
  viralPotential: string; // "High", "Medium", "Low"
}

export interface CompareResult {
  percentileBetter: number;
  strengths: string[];
  opportunities: string[];
  topPerformerGap: number;
  nicheAverage: number;
  yourScore: number;
}

export interface ResultsData {
  concept: ConceptResult;
  content: ContentResult;
  virality: ViralityResult;
  compare: CompareResult;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category:
    | "general"
    | "experience"
    | "technical"
    | "behavioral"
    | "motivation";
}

export interface InterviewTurnEvaluation {
  recruiterReaction: string;
  score: number;
  strengths: string[];
  improvements: string[];
  nextQuestion: string;
}

export interface InterviewTurn {
  question: string;
  answer: string;
  score: number;
  strengths: string[];
  improvements: string[];
}

export interface FinalInterviewReport {
  overallScore: number;

  metrics: {
    communication: number;
    specificity: number;
    structure: number;
    relevance: number;
    confidence: number;
  };

  summary: string;

  strongestAreas: string[];
  areasToImprove: string[];

  hiringRecommendation:
    | "strong_yes"
    | "yes"
    | "maybe"
    | "no";

  hiringReason: string;

  nextSteps: string[];
}

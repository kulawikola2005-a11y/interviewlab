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

export interface AnswerEvaluation {
  score: number;
  relevance: number;
  clarity: number;
  specificity: number;
  structure: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
  betterAnswer: string;
}

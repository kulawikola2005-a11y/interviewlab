export interface ResumeAnalysisMetrics {
  atsCompatibility: number;
  skillsMatch: number;
  experienceRelevance: number;
  impact: number;
  formatting: number;
}

export interface ResumeAnalysis {
  overallScore: number;

  metrics: ResumeAnalysisMetrics;

  strengths: string[];

  weaknesses: string[];

  improvements: string[];

  interviewQuestions: string[];

  summary: string;
}

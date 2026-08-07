export interface Resume {
  id: string;
  fileName: string;
  uploadedAt: string;

  score?: number;

  strengths?: string[];

  weaknesses?: string[];

  improvements?: string[];

  interviewQuestions?: string[];
}

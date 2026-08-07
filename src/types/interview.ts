export interface InterviewQuestion {
  id: string;
  question: string;
}

export interface InterviewAnswer {
  questionId: string;
  answer: string;

  score?: number;

  feedback?: string;
}

export interface InterviewSession {
  id: string;

  company: string;

  position: string;

  createdAt: string;

  overallScore?: number;

  questions: InterviewQuestion[];

  answers: InterviewAnswer[];
}

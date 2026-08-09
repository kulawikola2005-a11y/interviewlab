"use server";

import { evaluateInterviewAnswer } from "@/src/lib/openai/services/answerEvaluation";
import type { InterviewTurnEvaluation } from "@/src/types/interview";

export type EvaluateAnswerResult =
  | {
      success: true;
      evaluation: InterviewTurnEvaluation;
    }
  | {
      success: false;
      error: string;
    };

export async function evaluateAnswer({
  position,
  company,
  jobDescription,
  question,
  answer,
  previousQuestions,
}: {
  position: string;
  company?: string;
  jobDescription?: string;
  question: string;
  answer: string;
  previousQuestions: string[];
}): Promise<EvaluateAnswerResult> {
  if (!answer.trim()) {
    return {
      success: false,
      error: "Answer cannot be empty.",
    };
  }

  try {
    const evaluation = await evaluateInterviewAnswer({
      position,
      company,
      jobDescription,
      question,
      answer,
      previousQuestions,
    });

    return {
      success: true,
      evaluation,
    };
  } catch (error) {
    console.log(
      "Interview evaluation failed:",
      error instanceof Error ? error.message : error
    );

    return {
      success: false,
      error: "Unable to evaluate your answer.",
    };
  }
}

import "server-only";

import { openai } from "./openai";
import { buildAnswerEvaluationPrompt } from "../prompts/answerEvaluationPrompt";
import type { InterviewTurnEvaluation } from "@/src/types/interview";

export async function evaluateInterviewAnswer({
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
}): Promise<InterviewTurnEvaluation> {
  const prompt = buildAnswerEvaluationPrompt({
    position,
    company,
    jobDescription,
    question,
    answer,
    previousQuestions,
  });

  const response = await openai.responses.create({
    model: "gpt-5.6",

    input: prompt,

    text: {
      format: {
        type: "json_schema",
        name: "interview_turn_evaluation",
        strict: true,

        schema: {
          type: "object",

          properties: {
            recruiterReaction: {
              type: "string",
            },

            score: {
              type: "number",
            },

            strengths: {
              type: "array",
              items: {
                type: "string",
              },
            },

            improvements: {
              type: "array",
              items: {
                type: "string",
              },
            },

            nextQuestion: {
              type: "string",
            },
          },

          required: [
            "recruiterReaction",
            "score",
            "strengths",
            "improvements",
            "nextQuestion",
          ],

          additionalProperties: false,
        },
      },
    },
  });

  if (!response.output_text) {
    throw new Error("AI returned an empty interview evaluation.");
  }

  return JSON.parse(
    response.output_text
  ) as InterviewTurnEvaluation;
}

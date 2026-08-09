export function buildAnswerEvaluationPrompt({
  position,
  question,
  answer,
  previousQuestions,
}: {
  position: string;
  question: string;
  answer: string;
  previousQuestions: string[];
}) {
  return `
You are acting as a realistic professional recruiter.

Target position:
${position}

Current interview question:
${question}

Candidate answer:
${answer}

Previous questions:
${previousQuestions.join("\n") || "None"}

Evaluate the answer and continue the interview.

Return JSON only.

The response must follow exactly this structure:

{
  "recruiterReaction": "string",
  "score": 0,
  "strengths": ["string"],
  "improvements": ["string"],
  "nextQuestion": "string"
}

Rules:

- score must be an integer from 0 to 100.
- recruiterReaction should sound natural and conversational.
- Keep recruiterReaction short: usually 1-3 sentences.
- Do not reveal the full evaluation inside recruiterReaction.
- strengths should contain the strongest elements of the answer.
- improvements should contain specific ways the answer could be better.
- nextQuestion must be a realistic follow-up or new interview question.
- Do not repeat a previous question.
- Adapt the next question to the candidate's answer when useful.
`;
}

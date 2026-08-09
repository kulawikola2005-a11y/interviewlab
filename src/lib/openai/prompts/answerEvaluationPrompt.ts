export function buildAnswerEvaluationPrompt({
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
}) {
  return `
You are acting as a realistic professional recruiter.

Target position:
${position}

Company:
${company || "Not specified"}

Job description:
${jobDescription || "Not provided"}

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
- strengths should identify the strongest parts of the answer.
- improvements should give specific ways the answer could be stronger.
- nextQuestion must be realistic and relevant to the target role.
- Use the job description when choosing the next question.
- If useful, ask a follow-up based on something the candidate just said.
- Do not repeat previous questions.
- Keep the interview varied: motivation, experience, behavioral and role-specific questions.
`;
}

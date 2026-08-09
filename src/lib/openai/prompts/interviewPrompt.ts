export function buildInterviewQuestionPrompt({
  position,
  company,
  jobDescription,
  resumeSummary,
  previousQuestions,
}: {
  position: string;
  company?: string;
  jobDescription?: string;
  resumeSummary?: string;
  previousQuestions?: string[];
}) {
  return `
You are conducting a realistic professional job interview.

Target position:
${position}

Company:
${company || "Not specified"}

Job description:
${jobDescription || "Not provided"}

Candidate resume context:
${resumeSummary || "Not provided"}

Questions already asked:
${previousQuestions?.join("\n") || "None"}

Generate ONE interview question.

Requirements:
- The question must be relevant to the target position.
- Do not repeat previous questions.
- Prefer questions that reveal real experience, decision-making, skills, or motivation.
- Keep it natural, as if asked by a real recruiter.
- Do not provide an answer.
- Return ONLY the question text.
`;
}

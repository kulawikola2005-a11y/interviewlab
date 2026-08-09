import type { InterviewTurn } from "@/src/types/interview";

export function buildFinalInterviewPrompt({
  position,
  turns,
}: {
  position: string;
  turns: InterviewTurn[];
}) {
  const conversation = turns
    .map(
      (turn, index) => `
QUESTION ${index + 1}
${turn.question}

CANDIDATE ANSWER
${turn.answer}

ANSWER SCORE
${turn.score}/100
`
    )
    .join("\n");

  return `
You are a senior recruiter reviewing a completed mock interview.

Target position:
${position}

Interview transcript:

${conversation}

Evaluate the candidate across the entire interview.

Return a structured assessment.

Scoring rules:
- All scores must be integers from 0 to 100.
- Judge the full interview, not only the final answer.
- Be realistic rather than overly generous.
- Hiring recommendation must reflect the quality of the interview.

Metrics:

communication:
How clearly and professionally the candidate communicates.

specificity:
How often the candidate supports claims with concrete examples.

structure:
How logically and concisely answers are organized.

relevance:
How directly answers address the questions and target position.

confidence:
Infer confidence only from the written answers: decisiveness, clarity and lack of unnecessary uncertainty. Do not claim to evaluate voice or body language.

Hiring recommendation must be exactly one of:

strong_yes
yes
maybe
no
`;
}

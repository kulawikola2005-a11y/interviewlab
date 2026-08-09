alter table public.interview_sessions
add column if not exists company text;

alter table public.interview_sessions
add column if not exists job_description text;

alter table public.interview_sessions
add column if not exists interview_style text
  check (
    interview_style is null
    or interview_style in (
      'friendly',
      'hr',
      'technical',
      'startup',
      'stress'
    )
  );

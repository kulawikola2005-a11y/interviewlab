alter table public.resume_analyses
add column if not exists metrics jsonb not null default '{
  "atsCompatibility": 0,
  "skillsMatch": 0,
  "experienceRelevance": 0,
  "impact": 0,
  "formatting": 0
}'::jsonb;

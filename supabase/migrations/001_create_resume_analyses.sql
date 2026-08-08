create table if not exists public.resume_analyses (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  file_name text not null,

  job_description text,

  overall_score integer not null
    check (overall_score >= 0 and overall_score <= 100),

  summary text not null,

  strengths jsonb not null default '[]'::jsonb,
  weaknesses jsonb not null default '[]'::jsonb,
  improvements jsonb not null default '[]'::jsonb,
  interview_questions jsonb not null default '[]'::jsonb,

  created_at timestamptz not null default now()
);

alter table public.resume_analyses
enable row level security;

create policy "Users can view their own resume analyses"
on public.resume_analyses
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert their own resume analyses"
on public.resume_analyses
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own resume analyses"
on public.resume_analyses
for delete
to authenticated
using ((select auth.uid()) = user_id);

create index if not exists resume_analyses_user_id_created_at_idx
on public.resume_analyses(user_id, created_at desc);

create table if not exists public.interview_sessions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  position text not null,

  overall_score integer
    check (overall_score is null or (overall_score >= 0 and overall_score <= 100)),

  metrics jsonb,

  summary text,

  strongest_areas jsonb not null default '[]'::jsonb,
  areas_to_improve jsonb not null default '[]'::jsonb,

  hiring_recommendation text
    check (
      hiring_recommendation is null
      or hiring_recommendation in ('strong_yes', 'yes', 'maybe', 'no')
    ),

  hiring_reason text,

  next_steps jsonb not null default '[]'::jsonb,

  turns jsonb not null default '[]'::jsonb,

  duration_seconds integer not null default 0,

  created_at timestamptz not null default now()
);

alter table public.interview_sessions
enable row level security;

create policy "Users can view their own interview sessions"
on public.interview_sessions
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert their own interview sessions"
on public.interview_sessions
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own interview sessions"
on public.interview_sessions
for delete
to authenticated
using ((select auth.uid()) = user_id);

create index if not exists interview_sessions_user_created_idx
on public.interview_sessions(user_id, created_at desc);

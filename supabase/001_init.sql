create schema if not exists soulmayte;

create extension if not exists pgcrypto;

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'relationship_status'
      and n.nspname = 'soulmayte'
  ) then
    create type soulmayte.relationship_status as enum (
      'single',
      'talking',
      'dating',
      'situationship',
      'relationship',
      'complicated'
    );
  end if;

  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'looking_for_type'
      and n.nspname = 'soulmayte'
  ) then
    create type soulmayte.looking_for_type as enum (
      'soulmate',
      'serious_relationship',
      'dating',
      'marriage',
      'clarity'
    );
  end if;
end $$;

create table if not exists soulmayte.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  full_name text,
  city text,
  state text,
  relationship_status soulmayte.relationship_status,
  looking_for soulmayte.looking_for_type,
  notes text,
  source text default 'landing_page'
);

create unique index if not exists soulmayte_waitlist_entries_email_key
  on soulmayte.waitlist_entries (lower(email));

create table if not exists soulmayte.soulmate_readiness_quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text,
  attachment_style text,
  communication_style text,
  long_term_intent text,
  self_awareness_score integer check (self_awareness_score between 0 and 100),
  emotional_availability_score integer check (emotional_availability_score between 0 and 100),
  values_alignment_score integer check (values_alignment_score between 0 and 100),
  notes text
);

create table if not exists soulmayte.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  created_at timestamptz not null default now(),
  email text not null unique,
  full_name text,
  city text,
  state text,
  bio text,
  dating_intention text
);

create table if not exists soulmayte.partner_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  partner_name text not null,
  notes text,
  relationship_stage text
);

alter table soulmayte.waitlist_entries enable row level security;
alter table soulmayte.soulmate_readiness_quiz_submissions enable row level security;
alter table soulmayte.profiles enable row level security;
alter table soulmayte.partner_profiles enable row level security;

drop policy if exists "public can insert waitlist entries" on soulmayte.waitlist_entries;
create policy "public can insert waitlist entries"
on soulmayte.waitlist_entries
for insert
to anon, authenticated
with check (true);

drop policy if exists "service role full access waitlist" on soulmayte.waitlist_entries;
create policy "service role full access waitlist"
on soulmayte.waitlist_entries
for all
to service_role
using (true)
with check (true);

drop policy if exists "public can insert quiz submissions" on soulmayte.soulmate_readiness_quiz_submissions;
create policy "public can insert quiz submissions"
on soulmayte.soulmate_readiness_quiz_submissions
for insert
to anon, authenticated
with check (true);

drop policy if exists "service role full access quiz submissions" on soulmayte.soulmate_readiness_quiz_submissions;
create policy "service role full access quiz submissions"
on soulmayte.soulmate_readiness_quiz_submissions
for all
to service_role
using (true)
with check (true);

drop policy if exists "users can view own profile" on soulmayte.profiles;
create policy "users can view own profile"
on soulmayte.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "users can insert own profile" on soulmayte.profiles;
create policy "users can insert own profile"
on soulmayte.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "users can update own profile" on soulmayte.profiles;
create policy "users can update own profile"
on soulmayte.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "users can manage own partner profiles" on soulmayte.partner_profiles;
create policy "users can manage own partner profiles"
on soulmayte.partner_profiles
for all
to authenticated
using (auth.uid() = owner_user_id)
with check (auth.uid() = owner_user_id);

grant usage on schema soulmayte to anon, authenticated, service_role;
grant all on all tables in schema soulmayte to anon, authenticated, service_role;
grant all on all sequences in schema soulmayte to anon, authenticated, service_role;
grant all on all routines in schema soulmayte to anon, authenticated, service_role;

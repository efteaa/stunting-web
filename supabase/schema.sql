-- StuntAware database schema (Supabase / PostgreSQL)
-- Run in Supabase SQL Editor after enabling Authentication.

create extension if not exists pgcrypto;

create table if not exists public.children (
  child_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name varchar(80) not null,
  gender varchar(10) not null check (gender in ('female','male')),
  birth_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.measurements (
  measurement_id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(child_id) on delete cascade,
  measured_at date not null default current_date,
  age_month integer not null check (age_month between 0 and 60),
  height_cm numeric(5,1) not null,
  weight_kg numeric(5,2) not null,
  birth_weight_kg numeric(4,2),
  birth_length_cm numeric(4,1),
  breastfeeding varchar(20),
  parent_education varchar(80),
  economic_index numeric(5,2),
  created_at timestamptz not null default now()
);

create table if not exists public.predictions (
  prediction_id uuid primary key default gen_random_uuid(),
  measurement_id uuid not null references public.measurements(measurement_id) on delete cascade,
  risk_status varchar(16) not null check (risk_status in ('low','medium','high')),
  growth_status varchar(80),
  model_source varchar(40) not null default 'who_fallback',
  recommendation text,
  raw_result jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.education_articles (
  article_id uuid primary key default gen_random_uuid(),
  slug varchar(120) unique not null,
  title varchar(180) not null,
  content text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.children enable row level security;
alter table public.measurements enable row level security;
alter table public.predictions enable row level security;
alter table public.education_articles enable row level security;

create policy "users read own children" on public.children for select using (auth.uid() = user_id);
create policy "users insert own children" on public.children for insert with check (auth.uid() = user_id);
create policy "users update own children" on public.children for update using (auth.uid() = user_id);
create policy "users delete own children" on public.children for delete using (auth.uid() = user_id);

create policy "users read own measurements" on public.measurements for select using (
  exists(select 1 from public.children c where c.child_id = measurements.child_id and c.user_id = auth.uid())
);
create policy "users insert own measurements" on public.measurements for insert with check (
  exists(select 1 from public.children c where c.child_id = measurements.child_id and c.user_id = auth.uid())
);
create policy "users read own predictions" on public.predictions for select using (
  exists(
    select 1 from public.measurements m join public.children c on c.child_id=m.child_id
    where m.measurement_id=predictions.measurement_id and c.user_id=auth.uid()
  )
);
create policy "published education is public" on public.education_articles for select using (published = true);

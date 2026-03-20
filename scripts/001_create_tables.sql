-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  email text,
  phone text,
  stream text,
  target_course text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create queries table for admission inquiries
create table if not exists public.queries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  stream text not null,
  target_course text not null,
  message text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.queries enable row level security;

-- Profiles policies
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Queries policies (authenticated users can view their own)
create policy "queries_select_own" on public.queries for select using (auth.uid() = user_id);
create policy "queries_insert_own" on public.queries for insert with check (auth.uid() = user_id or user_id is null);
create policy "queries_update_own" on public.queries for update using (auth.uid() = user_id);
create policy "queries_delete_own" on public.queries for delete using (auth.uid() = user_id);

-- Allow anonymous (guest) queries
create policy "queries_insert_guest" on public.queries for insert with check (user_id is null);

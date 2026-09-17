-- Create table for webinar registrations
-- Run this in your Supabase SQL editor or via migration tooling

create table if not exists public.webinar (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  webinar_slug text not null,
  name text not null,
  email text not null,
  phone text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Helpful index for querying registrations per webinar
create index if not exists webinar_webinar_slug_idx
  on public.webinar (webinar_slug);

-- Helpful index for querying registrations per user
create index if not exists webinar_user_id_idx
  on public.webinar (user_id);

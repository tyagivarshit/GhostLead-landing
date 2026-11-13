-- ==============================================================================
-- GhostLead DFY (Done-For-You Data Desk) Pilot Leads Schema & RLS Policies
-- File: docs/sql/dfy_leads.sql
-- NOTE: Do not run automatically; apply via Supabase Dashboard SQL Editor.
-- ==============================================================================

-- 1. Create table for DFY pilot lead requests
create table if not exists public.dfy_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text not null,
  target_icp text not null,
  volume text not null,
  tier text not null,
  notes text,
  source_path text,
  status text not null default 'new'
);

-- 2. Enable Row Level Security (RLS)
alter table public.dfy_leads enable row level security;

-- 3. Policy: Allow anon users to INSERT lead capture requests only
-- Ensures basic validation (email length, non-empty required fields)
drop policy if exists "Allow anon insert to dfy_leads" on public.dfy_leads;
create policy "Allow anon insert to dfy_leads"
  on public.dfy_leads
  for insert
  to anon
  with check (
    char_length(trim(email)) >= 5 and
    position('@' in email) > 1 and
    char_length(trim(target_icp)) > 0 and
    char_length(trim(volume)) > 0 and
    char_length(trim(tier)) > 0
  );

-- 4. No SELECT, UPDATE, or DELETE policies for anon
-- By default in PostgreSQL / Supabase, when RLS is enabled and no select/update/delete 
-- policies exist for anon, all read and mutation queries by anonymous visitors are denied.

-- ==============================================================================
-- HOW TO VIEW & MANAGE SUBMITTED LEADS:
-- 1. Supabase Dashboard:
--    Navigate to: Table Editor -> "dfy_leads" table.
-- 2. Supabase SQL Editor / Backend Service:
--    Use the service_role secret key or PostgreSQL admin connection:
--      SELECT * FROM public.dfy_leads ORDER BY created_at DESC;
-- 3. Updating Lead Status:
--    Update status from 'new' to 'contacted', 'pilot_sent', or 'converted':
--      UPDATE public.dfy_leads SET status = 'pilot_sent' WHERE id = '<UUID>';
-- ==============================================================================

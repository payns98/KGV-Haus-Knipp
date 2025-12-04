
-- Supabase schema for Kleingartenverwaltung
-- Run this in your Supabase SQL editor

-- Profiles (linked to auth.users via auth_id)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid references auth.users(id) on delete cascade,
  full_name text,
  role text default 'member', -- 'member' or 'admin'
  plot_id uuid,
  plot_label text,
  created_at timestamptz default now()
);

-- Plots / Parzellen
create table if not exists plots (
  id uuid primary key default gen_random_uuid(),
  label text,
  size numeric,
  created_at timestamptz default now()
);

-- Invoices
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid references auth.users(id) on delete cascade,
  profile_id uuid references profiles(id),
  description text,
  amount numeric,
  status text default 'open', -- open, paid, canceled
  created_at timestamptz default now()
);

-- Payments (record of successful payments)
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id),
  stripe_payment_id text,
  amount numeric,
  created_at timestamptz default now()
);

-- Meter readings
create table if not exists meter_readings (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid references auth.users(id),
  profile_id uuid references profiles(id),
  type text, -- 'water' or 'electric'
  value numeric,
  reading_date date,
  created_at timestamptz default now()
);

-- Bookings (Vereinshaus)
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid references auth.users(id),
  requested_by_name text,
  date date,
  status text default 'requested', -- requested, confirmed, rejected
  created_at timestamptz default now()
);

-- Documents metadata (files stored in storage bucket 'documents')
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid references auth.users(id),
  profile_id uuid references profiles(id),
  name text,
  path text, -- storage path
  created_at timestamptz default now()
);

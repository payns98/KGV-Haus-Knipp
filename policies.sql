
-- Enable RLS and define policies
-- Run after creating tables

-- Enable RLS on tables
alter table profiles enable row level security;
alter table invoices enable row level security;
alter table meter_readings enable row level security;
alter table bookings enable row level security;
alter table documents enable row level security;
alter table payments enable row level security;
alter table plots enable row level security;

-- Profiles: users can select their own profile; admins can select all
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = auth_id or role = 'admin');
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = auth_id or role = 'admin');

-- Invoices: users can see only their invoices; admins can see all
create policy "invoices_select_owner" on invoices
  for select using (auth.uid() = auth_id or exists (select 1 from profiles p where p.role = 'admin' and p.auth_id = auth.uid()));
create policy "invoices_insert" on invoices
  for insert with check (auth.uid() = auth_id or exists (select 1 from profiles p where p.role = 'admin' and p.auth_id = auth.uid()));

-- Payments: only admins can view all payments; users can insert payments (recorded by server)
create policy "payments_select_admin" on payments
  for select using (exists (select 1 from profiles p where p.role = 'admin' and p.auth_id = auth.uid()));
create policy "payments_insert_server" on payments
  for insert with check (exists (select 1 from profiles p where p.role = 'admin' and p.auth_id = auth.uid()));

-- Meter readings: owners can insert/read their own; admins can read all
create policy "meter_readings_owner" on meter_readings
  for select using (auth.uid() = auth_id or exists (select 1 from profiles p where p.role = 'admin' and p.auth_id = auth.uid()));
create policy "meter_readings_insert" on meter_readings
  for insert with check (auth.uid() = auth_id);

-- Bookings: users can create; admins can read & update
create policy "bookings_insert" on bookings
  for insert with check (auth.uid() = auth_id);
create policy "bookings_select_admin" on bookings
  for select using (auth.uid() = auth_id or exists (select 1 from profiles p where p.role = 'admin' and p.auth_id = auth.uid()));

-- Documents: owners & admins
create policy "documents_select_owner" on documents
  for select using (auth.uid() = auth_id or exists (select 1 from profiles p where p.role = 'admin' and p.auth_id = auth.uid()));
create policy "documents_insert" on documents
  for insert with check (auth.uid() = auth_id or exists (select 1 from profiles p where p.role = 'admin' and p.auth_id = auth.uid()));

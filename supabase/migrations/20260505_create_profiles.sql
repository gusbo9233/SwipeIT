create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text,
  email text,
  role text check (role in ('candidate', 'recruiter')) not null default 'candidate',
  candidate jsonb not null default '{}',
  recruiter jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can manage own profile"
  on profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row on sign-up
create function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'name',
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'candidate')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

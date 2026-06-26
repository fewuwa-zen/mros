-- mros – Schema für die Bauteil-/Befund-Dokumentation
-- Objekt: Ragniter Allee 3 / 3a, Berlin (fest, einzelnes Objekt)
-- Hinweis: Dieses Tool ist bewusst OHNE Login (offen). Die RLS-Policies
-- erlauben daher anonymen Voll-Zugriff. Wer das Tool absichern will,
-- ergänzt später Supabase Auth und schränkt die Policies ein.

-- =========================================================
-- Tabellen
-- =========================================================

-- Bauteil, z. B. "Balkon Whg. 3a, 2. OG" oder "Regenrinne Hofseite"
create table if not exists public.bauteil (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  kategorie   text,                       -- Balkon | Ablauf | Regenrinne | Fassade | Sonstiges
  lage        text,                       -- freie Lagebeschreibung (Aufgang, Etage, Wohnung)
  beschreibung text,
  created_at  timestamptz not null default now()
);

-- Fotogruppe = ein Befund/Mangel zu einem Bauteil:
-- Problem, Lösung/Instandsetzung und Priorität (1-5)
create table if not exists public.fotogruppe (
  id          uuid primary key default gen_random_uuid(),
  bauteil_id  uuid not null references public.bauteil(id) on delete cascade,
  titel       text not null default 'Befund',
  problem     text,
  loesung     text,
  prioritaet  smallint check (prioritaet between 1 and 5),
  created_at  timestamptz not null default now()
);

-- Foto: gehört zu einem Bauteil und optional zu einer Fotogruppe.
-- fotogruppe_id NULL = hochgeladen, aber noch keiner Gruppe zugeordnet.
create table if not exists public.foto (
  id            uuid primary key default gen_random_uuid(),
  bauteil_id    uuid not null references public.bauteil(id) on delete cascade,
  fotogruppe_id uuid references public.fotogruppe(id) on delete set null,
  storage_path  text not null,            -- Pfad im Storage-Bucket "fotos"
  dateiname     text,
  created_at    timestamptz not null default now()
);

create index if not exists fotogruppe_bauteil_idx on public.fotogruppe (bauteil_id);
create index if not exists foto_bauteil_idx       on public.foto (bauteil_id);
create index if not exists foto_fotogruppe_idx     on public.foto (fotogruppe_id);

-- =========================================================
-- RLS – bewusst offen (kein Login)
-- =========================================================

alter table public.bauteil    enable row level security;
alter table public.fotogruppe enable row level security;
alter table public.foto       enable row level security;

-- Voller Zugriff für anon + authenticated (offenes Tool).
do $$
declare t text;
begin
  foreach t in array array['bauteil','fotogruppe','foto'] loop
    execute format($f$
      drop policy if exists %1$s_all on public.%1$s;
      create policy %1$s_all on public.%1$s
        for all to anon, authenticated
        using (true) with check (true);
    $f$, t);
  end loop;
end $$;

-- Data API: Rollen Zugriff geben (falls nicht automatisch exponiert)
grant usage on schema public to anon, authenticated;
grant all on public.bauteil, public.fotogruppe, public.foto to anon, authenticated;

-- =========================================================
-- Storage-Bucket für Fotos (öffentlich lesbar, da kein Login)
-- =========================================================

insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do update set public = true;

-- Offene Storage-Policies für den Bucket "fotos"
drop policy if exists "fotos_read"   on storage.objects;
drop policy if exists "fotos_insert" on storage.objects;
drop policy if exists "fotos_update" on storage.objects;
drop policy if exists "fotos_delete" on storage.objects;

create policy "fotos_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'fotos');
create policy "fotos_insert" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'fotos');
create policy "fotos_update" on storage.objects
  for update to anon, authenticated using (bucket_id = 'fotos') with check (bucket_id = 'fotos');
create policy "fotos_delete" on storage.objects
  for delete to anon, authenticated using (bucket_id = 'fotos');

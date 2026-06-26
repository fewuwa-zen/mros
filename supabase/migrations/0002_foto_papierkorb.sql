-- Papierkorb (Soft-Delete) für Fotos:
-- geloescht_am IS NULL  -> aktiv (im Eingang / zugeordnet)
-- geloescht_am gesetzt  -> im Papierkorb (wiederherstellbar)

alter table public.foto
  add column if not exists geloescht_am timestamptz;

create index if not exists foto_geloescht_am_idx
  on public.foto (geloescht_am);

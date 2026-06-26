# mros – Bauteildokumentation Ragniter Allee 3/3a

Web-Tool für Hrn. Mros (Bauingenieur) zur Erfassung von Bauteilen, Befunden
(Problem + Lösung + Priorität), zugehörigen Fotos und Export als PDF-Bericht.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind v4)
- Supabase (Postgres + Storage) via `@supabase/ssr`
- Kein Login (offenes Tool, ein festes Objekt)

## Datenmodell

```
bauteil ──< fotogruppe (= Befund: problem, loesung, prioritaet 1–5) ──< foto
   └──────────────────────────────────────────────────────────────< foto (ungeordnet)
```

Fotos werden zum Bauteil hochgeladen und anschließend einer Fotogruppe
zugeordnet. Eine Fotogruppe ist ein Befund mit Problem, Lösung und Priorität.

## Einrichtung

1. Supabase-Projekt anlegen auf <https://supabase.com/dashboard>.
2. Im SQL-Editor `supabase/migrations/0001_init.sql` ausführen
   (legt Tabellen, RLS-Policies und den Storage-Bucket `fotos` an).
3. `.env.local` füllen (Werte aus _Project Settings → API_):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<projekt>.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
   ```

4. Entwicklung starten:

   ```
   npm run dev
   ```

Solange keine gültigen Zugangsdaten gesetzt sind, zeigt die App einen
Einrichtungs-Hinweis statt eines Fehlers.

## Seiten

- `/` – Übersicht aller Bauteile, neues Bauteil anlegen
- `/bauteil/[id]` – Fotos hochladen, Befunde anlegen/bearbeiten, Fotos zuordnen
- `/bericht` – druck-/PDF-optimierter Gesamtbericht (Button „Als PDF speichern“)

## Sicherheitshinweis

Das Tool ist bewusst ohne Login gebaut; die RLS-Policies und der Storage-Bucket
erlauben anonymen Voll-Zugriff. Wer das absichern will, ergänzt Supabase Auth
und schränkt die Policies in `0001_init.sql` entsprechend ein.

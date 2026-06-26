// Prüft, ob echte Supabase-Zugangsdaten gesetzt sind (nicht die Platzhalter
// aus .env.example). So kann die App vor der Anbindung sinnvoll reagieren.
export function supabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
  if (!url || !key) return false;
  if (url.includes("<") || key.includes("<")) return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

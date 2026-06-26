import { createClient } from "@/lib/supabase/server";
import { FOTO_BUCKET, DOKUMENT_BUCKET } from "@/lib/constants";
import type {
  Bauteil,
  BauteilDetail,
  Dokument,
  DokumentMitUrl,
  Foto,
  FotoMitUrl,
  Fotogruppe,
} from "@/lib/types";

// foto-Row inkl. eingebetteter Dokument-Relation (Supabase embedded select)
type FotoRow = Foto & { dokument?: { titel: string | null } | null };

function withUrl(
  supabase: Awaited<ReturnType<typeof createClient>>,
  fotos: FotoRow[],
): FotoMitUrl[] {
  return fotos.map(({ dokument, ...f }) => ({
    ...f,
    url: supabase.storage.from(FOTO_BUCKET).getPublicUrl(f.storage_path).data
      .publicUrl,
    dokument_titel: dokument?.titel ?? null,
  }));
}

export async function getBauteile(): Promise<Bauteil[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bauteil")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getBauteilDetail(
  id: string,
): Promise<BauteilDetail | null> {
  const supabase = await createClient();

  const { data: bauteil, error: bErr } = await supabase
    .from("bauteil")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (bErr) throw bErr;
  if (!bauteil) return null;

  const [{ data: gruppen, error: gErr }, { data: fotos, error: fErr }] =
    await Promise.all([
      supabase
        .from("fotogruppe")
        .select("*")
        .eq("bauteil_id", id)
        .order("prioritaet", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: true }),
      supabase
        .from("foto")
        .select("*, dokument(titel)")
        .eq("bauteil_id", id)
        .order("abbildung_nr", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: true }),
    ]);
  if (gErr) throw gErr;
  if (fErr) throw fErr;

  const supabaseRef = supabase;
  const fotosMitUrl = withUrl(supabaseRef, (fotos as FotoRow[]) ?? []);

  const gruppenMitFotos = ((gruppen as Fotogruppe[]) ?? []).map((g) => ({
    ...g,
    fotos: fotosMitUrl.filter((f) => f.fotogruppe_id === g.id),
  }));

  const ungeordnet = fotosMitUrl.filter((f) => f.fotogruppe_id === null);

  return { ...bauteil, gruppen: gruppenMitFotos, ungeordnet };
}

// Unzugeordnete Fotos (bauteil_id IS NULL), gruppiert nach Quell-Dokument
export type EingangGruppe = {
  dokument_id: string | null;
  dokument_titel: string;
  fotos: FotoMitUrl[];
};

export async function getUnzugeordneteFotos(): Promise<EingangGruppe[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("foto")
    .select("*, dokument(titel)")
    .is("bauteil_id", null)
    .is("geloescht_am", null)
    .order("dokument_id", { ascending: true })
    .order("abbildung_nr", { ascending: true, nullsFirst: false });
  if (error) throw error;

  const fotos = withUrl(supabase, (data as FotoRow[]) ?? []);
  const map = new Map<string, EingangGruppe>();
  for (const f of fotos) {
    const key = f.dokument_id ?? "ohne";
    if (!map.has(key))
      map.set(key, {
        dokument_id: f.dokument_id,
        dokument_titel: f.dokument_titel ?? "Ohne Dokument",
        fotos: [],
      });
    map.get(key)!.fotos.push(f);
  }
  return [...map.values()];
}

export async function countUnzugeordnet(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("foto")
    .select("id", { count: "exact", head: true })
    .is("bauteil_id", null)
    .is("geloescht_am", null);
  return count ?? 0;
}

// Fotos im Papierkorb (geloescht_am gesetzt), neueste zuerst
export async function getPapierkorbFotos(): Promise<FotoMitUrl[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("foto")
    .select("*, dokument(titel)")
    .not("geloescht_am", "is", null)
    .order("geloescht_am", { ascending: false });
  if (error) throw error;
  return withUrl(supabase, (data as FotoRow[]) ?? []);
}

// Alle hochgeladenen PDF-Gutachten mit öffentlicher URL + Anzahl verknüpfter Fotos
export async function getDokumente(): Promise<DokumentMitUrl[]> {
  const supabase = await createClient();
  const { data: dokumente, error } = await supabase
    .from("dokument")
    .select("*")
    .order("datum", { ascending: true });
  if (error) throw error;

  const { data: fotos } = await supabase.from("foto").select("dokument_id");
  const zaehler = new Map<string, number>();
  for (const f of (fotos as { dokument_id: string | null }[]) ?? []) {
    if (f.dokument_id)
      zaehler.set(f.dokument_id, (zaehler.get(f.dokument_id) ?? 0) + 1);
  }

  return ((dokumente as Dokument[]) ?? []).map((d) => ({
    ...d,
    url: supabase.storage.from(DOKUMENT_BUCKET).getPublicUrl(d.storage_path)
      .data.publicUrl,
    fotos: zaehler.get(d.id) ?? 0,
  }));
}

// Für den Gesamtbericht: alle Bauteile inkl. Gruppen + Fotos
export async function getBerichtDaten(): Promise<BauteilDetail[]> {
  const bauteile = await getBauteile();
  const details = await Promise.all(
    bauteile.map((b) => getBauteilDetail(b.id)),
  );
  return details.filter((d): d is BauteilDetail => d !== null);
}

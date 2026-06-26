import { createClient } from "@/lib/supabase/server";
import { FOTO_BUCKET } from "@/lib/constants";
import type {
  Bauteil,
  BauteilDetail,
  Foto,
  FotoMitUrl,
  Fotogruppe,
} from "@/lib/types";

function withUrl(
  supabase: Awaited<ReturnType<typeof createClient>>,
  fotos: Foto[],
): FotoMitUrl[] {
  return fotos.map((f) => ({
    ...f,
    url: supabase.storage.from(FOTO_BUCKET).getPublicUrl(f.storage_path).data
      .publicUrl,
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
        .select("*")
        .eq("bauteil_id", id)
        .order("created_at", { ascending: true }),
    ]);
  if (gErr) throw gErr;
  if (fErr) throw fErr;

  const supabaseRef = supabase;
  const fotosMitUrl = withUrl(supabaseRef, (fotos as Foto[]) ?? []);

  const gruppenMitFotos = ((gruppen as Fotogruppe[]) ?? []).map((g) => ({
    ...g,
    fotos: fotosMitUrl.filter((f) => f.fotogruppe_id === g.id),
  }));

  const ungeordnet = fotosMitUrl.filter((f) => f.fotogruppe_id === null);

  return { ...bauteil, gruppen: gruppenMitFotos, ungeordnet };
}

// Für den Gesamtbericht: alle Bauteile inkl. Gruppen + Fotos
export async function getBerichtDaten(): Promise<BauteilDetail[]> {
  const bauteile = await getBauteile();
  const details = await Promise.all(
    bauteile.map((b) => getBauteilDetail(b.id)),
  );
  return details.filter((d): d is BauteilDetail => d !== null);
}

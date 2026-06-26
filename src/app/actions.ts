"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function str(v: FormDataEntryValue | null): string | null {
  const s = typeof v === "string" ? v.trim() : "";
  return s.length ? s : null;
}

// ---------- Bauteil ----------

export async function createBauteil(formData: FormData) {
  const name = str(formData.get("name"));
  if (!name) throw new Error("Name ist erforderlich");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bauteil")
    .insert({
      name,
      kategorie: str(formData.get("kategorie")),
      lage: str(formData.get("lage")),
      beschreibung: str(formData.get("beschreibung")),
    })
    .select("id")
    .single();
  if (error) throw error;

  revalidatePath("/");
  redirect(`/bauteil/${data.id}`);
}

export async function updateBauteil(formData: FormData) {
  const id = String(formData.get("id"));
  const name = str(formData.get("name"));
  if (!id || !name) throw new Error("ID und Name sind erforderlich");

  const supabase = await createClient();
  const { error } = await supabase
    .from("bauteil")
    .update({
      name,
      kategorie: str(formData.get("kategorie")),
      lage: str(formData.get("lage")),
      beschreibung: str(formData.get("beschreibung")),
    })
    .eq("id", id);
  if (error) throw error;

  revalidatePath(`/bauteil/${id}`);
  revalidatePath("/");
}

export async function deleteBauteil(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = await createClient();
  const { error } = await supabase.from("bauteil").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  redirect("/");
}

// ---------- Fotogruppe (Befund) ----------

export async function createFotogruppe(formData: FormData) {
  const bauteilId = String(formData.get("bauteil_id"));
  if (!bauteilId) throw new Error("bauteil_id fehlt");

  const supabase = await createClient();
  const { error } = await supabase.from("fotogruppe").insert({
    bauteil_id: bauteilId,
    titel: str(formData.get("titel")) ?? "Befund",
  });
  if (error) throw error;
  revalidatePath(`/bauteil/${bauteilId}`);
}

export async function updateFotogruppe(formData: FormData) {
  const id = String(formData.get("id"));
  const bauteilId = String(formData.get("bauteil_id"));
  const prioRaw = str(formData.get("prioritaet"));

  const supabase = await createClient();
  const { error } = await supabase
    .from("fotogruppe")
    .update({
      titel: str(formData.get("titel")) ?? "Befund",
      problem: str(formData.get("problem")),
      loesung: str(formData.get("loesung")),
      prioritaet: prioRaw ? Number(prioRaw) : null,
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath(`/bauteil/${bauteilId}`);
}

export async function deleteFotogruppe(formData: FormData) {
  const id = String(formData.get("id"));
  const bauteilId = String(formData.get("bauteil_id"));
  const supabase = await createClient();
  // Fotos der Gruppe werden durch ON DELETE SET NULL wieder "ungeordnet".
  const { error } = await supabase.from("fotogruppe").delete().eq("id", id);
  if (error) throw error;
  revalidatePath(`/bauteil/${bauteilId}`);
}

// ---------- Foto ----------

// Wird nach erfolgreichem Upload im Browser aufgerufen, um den DB-Eintrag anzulegen.
export async function registerFoto(input: {
  bauteil_id: string;
  storage_path: string;
  dateiname: string | null;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("foto").insert(input);
  if (error) throw error;
  revalidatePath(`/bauteil/${input.bauteil_id}`);
}

export async function assignFoto(formData: FormData) {
  const id = String(formData.get("id"));
  const bauteilId = String(formData.get("bauteil_id"));
  const gruppeRaw = str(formData.get("fotogruppe_id"));

  const supabase = await createClient();
  const { error } = await supabase
    .from("foto")
    .update({ fotogruppe_id: gruppeRaw })
    .eq("id", id);
  if (error) throw error;
  revalidatePath(`/bauteil/${bauteilId}`);
}

// Ordnet ein oder mehrere (bislang unzugeordnete) Fotos einem Bauteil zu.
export async function assignFotosToBauteil(
  fotoIds: string[],
  bauteilId: string,
) {
  if (!bauteilId || fotoIds.length === 0) return;
  const supabase = await createClient();
  const { error } = await supabase
    .from("foto")
    .update({ bauteil_id: bauteilId, fotogruppe_id: null })
    .in("id", fotoIds);
  if (error) throw error;
  revalidatePath("/eingang");
  revalidatePath(`/bauteil/${bauteilId}`);
  revalidatePath("/");
}

export async function deleteFoto(formData: FormData) {
  const id = String(formData.get("id"));
  const bauteilId = String(formData.get("bauteil_id"));
  const storagePath = String(formData.get("storage_path"));

  const supabase = await createClient();
  await supabase.storage.from("fotos").remove([storagePath]);
  const { error } = await supabase.from("foto").delete().eq("id", id);
  if (error) throw error;
  revalidatePath(`/bauteil/${bauteilId}`);
}

"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { FOTO_BUCKET } from "@/lib/constants";
import { registerFoto } from "@/app/actions";
import { useDict } from "@/lib/i18n/context";

export function FotoUpload({ bauteilId }: { bauteilId: string }) {
  const dict = useDict();
  const t = dict.upload;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);

  async function handleFiles(files: FileList) {
    setBusy(true);
    setFehler(null);
    const supabase = createClient();
    const liste = Array.from(files);
    let ok = 0;

    for (const [i, file] of liste.entries()) {
      setStatus(t.laeuft(i + 1, liste.length));
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${bauteilId}/${crypto.randomUUID()}-${safe}`;
      const { error: upErr } = await supabase.storage
        .from(FOTO_BUCKET)
        .upload(path, file, { upsert: false });
      if (upErr) {
        setFehler(t.uploadFehler(upErr.message));
        break;
      }
      try {
        await registerFoto({
          bauteil_id: bauteilId,
          storage_path: path,
          dateiname: file.name,
        });
        ok += 1;
      } catch (e) {
        setFehler(t.eintragFehler(e instanceof Error ? e.message : String(e)));
        break;
      }
    }

    setBusy(false);
    setStatus(ok ? t.fertig(ok) : null);
    if (inputRef.current) inputRef.current.value = "";
    router.refresh();
  }

  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4">
      <label className="flex cursor-pointer flex-col items-center gap-2 text-center">
        <span className="text-sm font-medium text-slate-700">{t.titel}</span>
        <span className="text-xs text-slate-500">{t.hinweis}</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={busy}
          className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 disabled:opacity-50"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
          }}
        />
      </label>
      {status && !fehler && (
        <p className="mt-2 text-center text-xs text-slate-500">{status}</p>
      )}
      {fehler && (
        <p className="mt-2 text-center text-xs text-red-600">{fehler}</p>
      )}
    </div>
  );
}

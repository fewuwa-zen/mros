"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { FotoMitUrl, Fotogruppe } from "@/lib/types";
import { assignFoto, deleteFoto } from "@/app/actions";
import { useDict } from "@/lib/i18n/context";

export function FotoKachel({
  foto,
  gruppen,
}: {
  foto: FotoMitUrl;
  gruppen: Pick<Fotogruppe, "id" | "titel">[];
}) {
  const dict = useDict();
  const t = dict.foto;
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={foto.url}
        alt={foto.dateiname ?? "Foto"}
        className="aspect-square w-full cursor-zoom-in object-cover"
        role="button"
        tabIndex={0}
        aria-label={t.vergroessernAria}
        onClick={() => setZoom(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setZoom(true);
          }
        }}
      />
      {zoom && (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            aria-label={t.schliessen}
            onClick={() => setZoom(false)}
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-slate-900 hover:bg-white"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={foto.url}
            alt={foto.dateiname ?? "Foto"}
            className="max-h-full max-w-full cursor-zoom-out object-contain"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 p-2">
        {foto.befund && (
          <p className="text-xs text-slate-700">{foto.befund}</p>
        )}
        {foto.dokument_titel && foto.abbildung_nr != null && (
          <p className="text-[10px] leading-tight text-slate-400">
            {dict.fotoMeta.quelle(
              foto.dokument_titel,
              foto.abbildung_nr,
              foto.quelle_seite ?? 0,
            )}
          </p>
        )}
        <select
          aria-label={t.zuordnenAria}
          disabled={busy}
          defaultValue={foto.fotogruppe_id ?? ""}
          className="w-full rounded border border-slate-300 px-1.5 py-1 text-xs"
          onChange={async (e) => {
            setBusy(true);
            const fd = new FormData();
            fd.set("id", foto.id);
            fd.set("bauteil_id", foto.bauteil_id);
            fd.set("fotogruppe_id", e.target.value);
            try {
              await assignFoto(fd);
              router.refresh();
            } finally {
              setBusy(false);
            }
          }}
        >
          <option value="">{t.nichtZugeordnetOpt}</option>
          {gruppen.map((g) => (
            <option key={g.id} value={g.id}>
              {g.titel}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            if (!confirm(t.confirmDelete)) return;
            setBusy(true);
            const fd = new FormData();
            fd.set("id", foto.id);
            fd.set("bauteil_id", foto.bauteil_id);
            fd.set("storage_path", foto.storage_path);
            try {
              await deleteFoto(fd);
              router.refresh();
            } finally {
              setBusy(false);
            }
          }}
          className="text-xs text-red-600 hover:underline disabled:opacity-50"
        >
          {t.loeschen}
        </button>
      </div>
    </div>
  );
}

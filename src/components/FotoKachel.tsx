"use client";

import { useState } from "react";
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
  const t = useDict().foto;
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={foto.url}
        alt={foto.dateiname ?? "Foto"}
        className="aspect-square w-full object-cover"
      />
      <div className="flex flex-col gap-1 p-2">
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

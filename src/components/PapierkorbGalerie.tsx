"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { FotoMitUrl } from "@/lib/types";
import { restoreFotos, deleteFotosPermanent } from "@/app/actions";
import { useDict } from "@/lib/i18n/context";

export function PapierkorbGalerie({ fotos }: { fotos: FotoMitUrl[] }) {
  const dict = useDict();
  const t = dict.papierkorb;
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);

  const alleIds = useMemo(() => fotos.map((f) => f.id), [fotos]);
  const alleGewaehlt = selected.size > 0 && selected.size === alleIds.length;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAlle() {
    setSelected(alleGewaehlt ? new Set() : new Set(alleIds));
  }

  async function wiederherstellen() {
    if (selected.size === 0) return;
    setBusy(true);
    try {
      await restoreFotos([...selected]);
      setSelected(new Set());
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function endgueltigLoeschen() {
    if (selected.size === 0) return;
    if (!confirm(t.confirmEndgueltig(selected.size))) return;
    setBusy(true);
    try {
      await deleteFotosPermanent([...selected]);
      setSelected(new Set());
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-5">
      <p className="text-sm text-slate-500">{t.hinweis}</p>

      {/* Sticky-Aktionsleiste */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={toggleAlle}
          className="rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
        >
          {alleGewaehlt ? t.auswahlAufheben : t.alleWaehlen}
        </button>
        <button
          type="button"
          disabled={busy || selected.size === 0}
          onClick={wiederherstellen}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-40"
        >
          {busy ? t.wiederherstellenLaeuft : t.wiederherstellen(selected.size)}
        </button>
        <button
          type="button"
          disabled={busy || selected.size === 0}
          onClick={endgueltigLoeschen}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-40"
        >
          {busy ? t.endgueltigLaeuft : t.endgueltig(selected.size)}
        </button>
        <span className="ml-auto text-xs text-slate-400">
          {selected.size}/{alleIds.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {fotos.map((f) => {
          const aktiv = selected.has(f.id);
          return (
            <button
              type="button"
              key={f.id}
              onClick={() => toggle(f.id)}
              className={`group relative overflow-hidden rounded-md border bg-white text-left transition ${
                aktiv
                  ? "border-slate-900 ring-2 ring-slate-900"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.url}
                alt={f.dateiname ?? "Foto"}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full bg-slate-100 object-cover"
              />
              <span
                className={`absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-bold ${
                  aktiv
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white/80 text-transparent"
                }`}
              >
                ✓
              </span>
              <span className="block px-1.5 py-1 text-[10px] leading-tight text-slate-500">
                {f.dateiname}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

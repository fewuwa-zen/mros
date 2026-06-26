"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Bauteil } from "@/lib/types";
import type { EingangGruppe } from "@/lib/data";
import { assignFotosToBauteil } from "@/app/actions";
import { useDict } from "@/lib/i18n/context";

type BauteilOpt = Pick<Bauteil, "id" | "name" | "kategorie">;

export function EingangGalerie({
  gruppen,
  bauteile,
}: {
  gruppen: EingangGruppe[];
  bauteile: BauteilOpt[];
}) {
  const dict = useDict();
  const t = dict.eingang;
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [zielBauteil, setZielBauteil] = useState("");
  const [busy, setBusy] = useState(false);

  const alleIds = useMemo(
    () => gruppen.flatMap((g) => g.fotos.map((f) => f.id)),
    [gruppen],
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleGruppe(ids: string[]) {
    setSelected((prev) => {
      const next = new Set(prev);
      const alleDrin = ids.every((id) => next.has(id));
      ids.forEach((id) => (alleDrin ? next.delete(id) : next.add(id)));
      return next;
    });
  }

  async function zuweisen() {
    if (!zielBauteil || selected.size === 0) return;
    setBusy(true);
    try {
      await assignFotosToBauteil([...selected], zielBauteil);
      setSelected(new Set());
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  if (bauteile.length === 0) {
    return (
      <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
        {t.keinBauteil}
      </p>
    );
  }

  return (
    <div className="grid gap-5">
      <p className="text-sm text-slate-500">{t.hinweis}</p>

      {/* Sticky-Aktionsleiste */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
        <select
          value={zielBauteil}
          onChange={(e) => setZielBauteil(e.target.value)}
          className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
        >
          <option value="">{t.bauteilWaehlen}</option>
          {bauteile.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
              {b.kategorie ? ` (${dict.kategorie[b.kategorie] ?? b.kategorie})` : ""}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy || !zielBauteil || selected.size === 0}
          onClick={zuweisen}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-40"
        >
          {busy ? t.zuweisenLaeuft : t.zuweisen(selected.size)}
        </button>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
          >
            {t.auswahlAufheben}
          </button>
        )}
        <span className="ml-auto text-xs text-slate-400">
          {selected.size}/{alleIds.length}
        </span>
      </div>

      {gruppen.map((g) => {
        const ids = g.fotos.map((f) => f.id);
        return (
          <section key={g.dokument_id ?? "ohne"} className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-800">
                {g.dokument_titel}{" "}
                <span className="font-normal text-slate-400">
                  ({g.fotos.length})
                </span>
              </h2>
              <button
                type="button"
                onClick={() => toggleGruppe(ids)}
                className="text-xs text-slate-500 hover:underline"
              >
                {t.alleWaehlen}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {g.fotos.map((f) => {
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
          </section>
        );
      })}
    </div>
  );
}

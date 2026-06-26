"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Bauteil } from "@/lib/types";
import { useDict } from "@/lib/i18n/context";

export function BauteilListe({ bauteile }: { bauteile: Bauteil[] }) {
  const dict = useDict();
  const [suche, setSuche] = useState("");

  const gefiltert = useMemo(() => {
    const q = suche.trim().toLowerCase();
    if (!q) return bauteile;
    return bauteile.filter((b) => {
      const kat = b.kategorie ? dict.kategorie[b.kategorie] ?? b.kategorie : "";
      return [b.name, b.lage, b.beschreibung, b.kategorie, kat]
        .filter(Boolean)
        .some((feld) => feld!.toLowerCase().includes(q));
    });
  }, [bauteile, suche, dict]);

  return (
    <div className="grid gap-3">
      <input
        type="search"
        value={suche}
        onChange={(e) => setSuche(e.target.value)}
        placeholder={dict.home.suchePlaceholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
      />

      {gefiltert.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          {dict.home.keinTreffer}
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {gefiltert.map((b) => (
            <li key={b.id}>
              <Link
                href={`/bauteil/${b.id}`}
                className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-400 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-slate-900">{b.name}</span>
                  {b.kategorie && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {dict.kategorie[b.kategorie] ?? b.kategorie}
                    </span>
                  )}
                </div>
                {b.lage && (
                  <p className="mt-1 text-sm text-slate-500">{b.lage}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

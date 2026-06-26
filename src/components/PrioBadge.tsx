"use client";

import { prioFarbe } from "@/lib/constants";
import { useDict } from "@/lib/i18n/context";

export function PrioBadge({ wert }: { wert: number | null | undefined }) {
  const dict = useDict();
  const farbe = prioFarbe(wert);

  if (!wert || !farbe) {
    return (
      <span className="inline-flex items-center rounded-full border border-slate-300 px-2 py-0.5 text-xs text-slate-500">
        {dict.prioBadge.ohne}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold text-white"
      style={{ backgroundColor: farbe }}
    >
      {dict.prio[wert as 1 | 2 | 3 | 4 | 5]}
    </span>
  );
}

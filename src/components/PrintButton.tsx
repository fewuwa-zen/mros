"use client";

import { useDict } from "@/lib/i18n/context";

export function PrintButton() {
  const dict = useDict();
  return (
    <button
      onClick={() => window.print()}
      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
    >
      {dict.bericht.print}
    </button>
  );
}

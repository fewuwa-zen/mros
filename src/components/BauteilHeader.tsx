"use client";

import { useState } from "react";
import Link from "next/link";
import type { Bauteil } from "@/lib/types";
import { BauteilForm } from "@/components/BauteilForm";
import { deleteBauteil } from "@/app/actions";
import { useDict } from "@/lib/i18n/context";

export function BauteilHeader({ bauteil }: { bauteil: Bauteil }) {
  const dict = useDict();
  const t = dict.bauteil;
  const [edit, setEdit] = useState(false);

  if (edit) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          {t.bearbeitenTitel}
        </h2>
        <BauteilForm bauteil={bauteil} onDone={() => setEdit(false)} />
      </div>
    );
  }

  const kategorieLabel = bauteil.kategorie
    ? (dict.kategorie[bauteil.kategorie] ?? bauteil.kategorie)
    : null;

  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <Link href="/" className="text-xs text-slate-500 hover:underline">
          {t.alle}
        </Link>
        <h1 className="mt-1 text-xl font-semibold text-slate-900">
          {bauteil.name}
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {[kategorieLabel, bauteil.lage].filter(Boolean).join(" · ") ||
            t.ohneKatLage}
        </p>
        {bauteil.beschreibung && (
          <p className="mt-1 max-w-prose text-sm text-slate-600">
            {bauteil.beschreibung}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setEdit(true)}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
        >
          {t.bearbeiten}
        </button>
        <form
          action={deleteBauteil}
          onSubmit={(e) => {
            if (!confirm(t.confirmDelete)) e.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={bauteil.id} />
          <button
            type="submit"
            className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
          >
            {t.loeschen}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFotogruppe } from "@/app/actions";
import { useDict } from "@/lib/i18n/context";

export function NeueFotogruppe({ bauteilId }: { bauteilId: string }) {
  const t = useDict().neueGruppe;
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <form
      action={async (fd) => {
        setPending(true);
        try {
          await createFotogruppe(fd);
          router.refresh();
        } finally {
          setPending(false);
        }
      }}
      className="flex items-end gap-2"
    >
      <input type="hidden" name="bauteil_id" value={bauteilId} />
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-slate-600">
          {t.label}
        </label>
        <input
          name="titel"
          placeholder={t.placeholder}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {pending ? "…" : t.button}
      </button>
    </form>
  );
}

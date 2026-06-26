"use client";

import { useState } from "react";
import { KATEGORIEN } from "@/lib/constants";
import type { Bauteil } from "@/lib/types";
import { createBauteil, updateBauteil } from "@/app/actions";
import { useDict } from "@/lib/i18n/context";

const inputCls =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500";
const labelCls = "block text-xs font-medium text-slate-600 mb-1";

export function BauteilForm({
  bauteil,
  onDone,
}: {
  bauteil?: Bauteil;
  onDone?: () => void;
}) {
  const dict = useDict();
  const t = dict.bauteilForm;
  const isEdit = Boolean(bauteil);
  const [pending, setPending] = useState(false);

  return (
    <form
      action={async (fd) => {
        setPending(true);
        try {
          if (isEdit) await updateBauteil(fd);
          else await createBauteil(fd);
          onDone?.();
        } finally {
          setPending(false);
        }
      }}
      className="grid gap-3"
    >
      {isEdit && <input type="hidden" name="id" value={bauteil!.id} />}
      <div>
        <label className={labelCls}>{t.bezeichnung}</label>
        <input
          name="name"
          required
          defaultValue={bauteil?.name ?? ""}
          placeholder={t.bezeichnungPh}
          className={inputCls}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelCls}>{t.kategorie}</label>
          <select
            name="kategorie"
            defaultValue={bauteil?.kategorie ?? ""}
            className={inputCls}
          >
            <option value="">{t.waehlen}</option>
            {KATEGORIEN.map((k) => (
              <option key={k} value={k}>
                {dict.kategorie[k] ?? k}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>{t.lage}</label>
          <input
            name="lage"
            defaultValue={bauteil?.lage ?? ""}
            placeholder={t.lagePh}
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>{t.beschreibung}</label>
        <textarea
          name="beschreibung"
          defaultValue={bauteil?.beschreibung ?? ""}
          rows={2}
          className={inputCls}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {pending ? t.speichernLaeuft : isEdit ? t.speichern : t.anlegen}
        </button>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            {t.abbrechen}
          </button>
        )}
      </div>
    </form>
  );
}

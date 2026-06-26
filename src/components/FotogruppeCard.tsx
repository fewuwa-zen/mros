"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRIO_WERTE } from "@/lib/constants";
import type { FotogruppeMitFotos, Fotogruppe } from "@/lib/types";
import { updateFotogruppe, deleteFotogruppe } from "@/app/actions";
import { FotoKachel } from "@/components/FotoKachel";
import { PrioBadge } from "@/components/PrioBadge";
import { useDict } from "@/lib/i18n/context";

const inputCls =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500";
const labelCls = "block text-xs font-medium text-slate-600 mb-1";

export function FotogruppeCard({
  gruppe,
  alleGruppen,
}: {
  gruppe: FotogruppeMitFotos;
  alleGruppen: Pick<Fotogruppe, "id" | "titel">[];
}) {
  const dict = useDict();
  const t = dict.gruppe;
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <div className="print-break rounded-lg border border-slate-200 bg-white p-4">
      {!edit ? (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">{gruppe.titel}</h3>
              <div className="mt-1">
                <PrioBadge wert={gruppe.prioritaet} />
              </div>
            </div>
            <button
              onClick={() => setEdit(true)}
              className="no-print rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
            >
              {t.bearbeiten}
            </button>
          </div>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t.problem}
              </dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                {gruppe.problem || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t.loesung}
              </dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                {gruppe.loesung || "—"}
              </dd>
            </div>
          </dl>
        </>
      ) : (
        <form
          action={async (fd) => {
            setPending(true);
            try {
              await updateFotogruppe(fd);
              setEdit(false);
              router.refresh();
            } finally {
              setPending(false);
            }
          }}
          className="grid gap-3"
        >
          <input type="hidden" name="id" value={gruppe.id} />
          <input type="hidden" name="bauteil_id" value={gruppe.bauteil_id} />
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>{t.titel}</label>
              <input
                name="titel"
                defaultValue={gruppe.titel}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>{t.prioritaet}</label>
              <select
                name="prioritaet"
                defaultValue={gruppe.prioritaet ?? ""}
                className={inputCls}
              >
                <option value="">{t.ohnePrio}</option>
                {PRIO_WERTE.map((w) => (
                  <option key={w} value={w}>
                    {dict.prio[w]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>{t.problem}</label>
            <textarea
              name="problem"
              defaultValue={gruppe.problem ?? ""}
              rows={3}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>{t.loesung}</label>
            <textarea
              name="loesung"
              defaultValue={gruppe.loesung ?? ""}
              rows={3}
              className={inputCls}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {pending ? t.speichernLaeuft : t.speichern}
            </button>
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
            >
              {t.abbrechen}
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!confirm(t.confirmDelete)) return;
                const fd = new FormData();
                fd.set("id", gruppe.id);
                fd.set("bauteil_id", gruppe.bauteil_id);
                await deleteFotogruppe(fd);
                router.refresh();
              }}
              className="ml-auto rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              {t.gruppeLoeschen}
            </button>
          </div>
        </form>
      )}

      {gruppe.fotos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {gruppe.fotos.map((f) => (
            <FotoKachel key={f.id} foto={f} gruppen={alleGruppen} />
          ))}
        </div>
      )}
    </div>
  );
}

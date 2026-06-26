import { getBerichtDaten } from "@/lib/data";
import { OBJEKT } from "@/lib/constants";
import { PrintButton } from "@/components/PrintButton";
import { PrioBadge } from "@/components/PrioBadge";
import { SetupHinweis } from "@/components/SetupHinweis";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getServerDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function BerichtPage() {
  if (!supabaseConfigured()) return <SetupHinweis />;
  const { dict } = await getServerDict();
  const bauteile = await getBerichtDaten();

  const anzahlBefunde = bauteile.reduce((n, b) => n + b.gruppen.length, 0);

  return (
    <div className="grid gap-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            {dict.bericht.title}
          </h1>
          <p className="text-sm text-slate-500">
            {dict.bericht.summary(bauteile.length, anzahlBefunde)}
          </p>
        </div>
        <PrintButton />
      </div>

      {/* Berichtskopf (auch im Druck sichtbar) */}
      <header className="border-b border-slate-300 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">
          {dict.bericht.kopfTitel}
        </h2>
        <p className="mt-1 text-slate-700">
          {dict.bericht.objektLabel} <strong>{OBJEKT.name}</strong>, {OBJEKT.ort}
        </p>
        <p className="text-sm text-slate-500">
          {dict.bericht.bearbeitungLabel(dict.bearbeiter)}
        </p>
      </header>

      {bauteile.length === 0 && (
        <p className="text-sm text-slate-500">{dict.bericht.keineDaten}</p>
      )}

      {bauteile.map((b) => (
        <section key={b.id} className="print-break grid gap-3">
          <div className="border-b border-slate-200 pb-1">
            <h3 className="text-lg font-semibold text-slate-900">{b.name}</h3>
            <p className="text-sm text-slate-500">
              {[
                b.kategorie ? (dict.kategorie[b.kategorie] ?? b.kategorie) : null,
                b.lage,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {b.beschreibung && (
              <p className="mt-1 text-sm text-slate-600">{b.beschreibung}</p>
            )}
          </div>

          {b.gruppen.length === 0 ? (
            <p className="text-sm text-slate-400">
              {dict.bericht.keineBefunde}
            </p>
          ) : (
            b.gruppen.map((g) => (
              <div
                key={g.id}
                className="print-break rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-slate-900">{g.titel}</h4>
                  <PrioBadge wert={g.prioritaet} />
                </div>
                <dl className="mt-2 grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {dict.gruppe.problem}
                    </dt>
                    <dd className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                      {g.problem || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {dict.gruppe.loesung}
                    </dt>
                    <dd className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                      {g.loesung || "—"}
                    </dd>
                  </div>
                </dl>
                {g.fotos.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {g.fotos.map((f) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={f.id}
                        src={f.url}
                        alt={f.dateiname ?? "Foto"}
                        className="aspect-square w-full rounded border border-slate-200 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      ))}
    </div>
  );
}

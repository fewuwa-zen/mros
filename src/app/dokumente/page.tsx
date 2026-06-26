import { getDokumente } from "@/lib/data";
import { OBJEKT } from "@/lib/constants";
import { SetupHinweis } from "@/components/SetupHinweis";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getServerDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function DokumentePage() {
  if (!supabaseConfigured()) return <SetupHinweis />;
  const { lang, dict } = await getServerDict();
  const dokumente = await getDokumente();
  const t = dict.dokumente;

  const fmtDatum = (d: string | null) =>
    d
      ? new Date(d).toLocaleDateString(lang === "en" ? "en-GB" : "de-DE", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-500">
          {OBJEKT.name}, {OBJEKT.ort} · {t.subtitle}
        </p>
      </div>

      {dokumente.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          {t.leer}
        </div>
      ) : (
        <ul className="grid gap-3">
          {dokumente.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="text-lg">
                    📄
                  </span>
                  <span className="font-medium text-slate-900">
                    {d.titel ?? d.dateiname}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {fmtDatum(d.datum)}
                  {d.datum ? " · " : ""}
                  {t.meta(d.seiten ?? 0, d.fotos)}
                </p>
              </div>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
              >
                {t.oeffnen}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

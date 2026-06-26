import Link from "next/link";
import { getBauteile } from "@/lib/data";
import { OBJEKT } from "@/lib/constants";
import { NeuesBauteil } from "@/components/NeuesBauteil";
import { SetupHinweis } from "@/components/SetupHinweis";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getServerDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (!supabaseConfigured()) return <SetupHinweis />;
  const { dict } = await getServerDict();
  const bauteile = await getBauteile();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            {dict.home.title}
          </h1>
          <p className="text-sm text-slate-500">
            {OBJEKT.name}, {OBJEKT.ort}
          </p>
        </div>
        <NeuesBauteil />
      </div>

      {bauteile.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          {dict.home.leer}
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {bauteile.map((b) => (
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

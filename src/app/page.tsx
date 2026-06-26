import { getBauteile } from "@/lib/data";
import { OBJEKT } from "@/lib/constants";
import { NeuesBauteil } from "@/components/NeuesBauteil";
import { BauteilListe } from "@/components/BauteilListe";
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
        <BauteilListe bauteile={bauteile} />
      )}
    </div>
  );
}

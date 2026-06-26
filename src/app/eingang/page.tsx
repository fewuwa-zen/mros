import { getUnzugeordneteFotos, getBauteile } from "@/lib/data";
import { OBJEKT } from "@/lib/constants";
import { SetupHinweis } from "@/components/SetupHinweis";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getServerDict } from "@/lib/i18n/server";
import { EingangGalerie } from "@/components/EingangGalerie";

export const dynamic = "force-dynamic";

export default async function EingangPage() {
  if (!supabaseConfigured()) return <SetupHinweis />;
  const { dict } = await getServerDict();
  const [gruppen, bauteile] = await Promise.all([
    getUnzugeordneteFotos(),
    getBauteile(),
  ]);
  const t = dict.eingang;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-500">
          {OBJEKT.name}, {OBJEKT.ort} · {t.subtitle}
        </p>
      </div>

      {gruppen.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          {t.leer}
        </div>
      ) : (
        <EingangGalerie
          gruppen={gruppen}
          bauteile={bauteile.map((b) => ({
            id: b.id,
            name: b.name,
            kategorie: b.kategorie,
          }))}
        />
      )}
    </div>
  );
}

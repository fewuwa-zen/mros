import { getPapierkorbFotos } from "@/lib/data";
import { OBJEKT } from "@/lib/constants";
import { SetupHinweis } from "@/components/SetupHinweis";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getServerDict } from "@/lib/i18n/server";
import { PapierkorbGalerie } from "@/components/PapierkorbGalerie";

export const dynamic = "force-dynamic";

export default async function PapierkorbPage() {
  if (!supabaseConfigured()) return <SetupHinweis />;
  const { dict } = await getServerDict();
  const fotos = await getPapierkorbFotos();
  const t = dict.papierkorb;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-500">
          {OBJEKT.name}, {OBJEKT.ort} · {t.subtitle}
        </p>
      </div>

      {fotos.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          {t.leer}
        </div>
      ) : (
        <PapierkorbGalerie fotos={fotos} />
      )}
    </div>
  );
}

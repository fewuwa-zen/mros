import { notFound } from "next/navigation";
import { getBauteilDetail } from "@/lib/data";
import { BauteilHeader } from "@/components/BauteilHeader";
import { FotoUpload } from "@/components/FotoUpload";
import { NeueFotogruppe } from "@/components/NeueFotogruppe";
import { FotogruppeCard } from "@/components/FotogruppeCard";
import { FotoKachel } from "@/components/FotoKachel";
import { SetupHinweis } from "@/components/SetupHinweis";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getServerDict } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function BauteilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!supabaseConfigured()) return <SetupHinweis />;
  const { dict } = await getServerDict();
  const { id } = await params;
  const bauteil = await getBauteilDetail(id);
  if (!bauteil) notFound();

  const gruppenRef = bauteil.gruppen.map((g) => ({ id: g.id, titel: g.titel }));

  return (
    <div className="grid gap-6">
      <BauteilHeader bauteil={bauteil} />

      <FotoUpload bauteilId={bauteil.id} />

      {/* Noch nicht zugeordnete Fotos */}
      {bauteil.ungeordnet.length > 0 && (
        <section className="grid gap-2">
          <h2 className="text-sm font-semibold text-slate-700">
            {dict.detail.nichtZugeordnet(bauteil.ungeordnet.length)}
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {bauteil.ungeordnet.map((f) => (
              <FotoKachel key={f.id} foto={f} gruppen={gruppenRef} />
            ))}
          </div>
        </section>
      )}

      {/* Befund-Gruppen */}
      <section className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">
            {dict.detail.befunde}
          </h2>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <NeueFotogruppe bauteilId={bauteil.id} />
        </div>

        {bauteil.gruppen.length === 0 ? (
          <p className="text-sm text-slate-500">{dict.detail.keineBefunde}</p>
        ) : (
          bauteil.gruppen.map((g) => (
            <FotogruppeCard key={g.id} gruppe={g} alleGruppen={gruppenRef} />
          ))
        )}
      </section>
    </div>
  );
}

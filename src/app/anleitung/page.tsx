import { OBJEKT } from "@/lib/constants";
import { getServerDict } from "@/lib/i18n/server";

export default async function AnleitungPage() {
  const { dict } = await getServerDict();
  const t = dict.anleitung;

  return (
    <div className="mx-auto grid max-w-3xl gap-8 text-slate-800">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          {t.title}
        </h1>
        <p className="mt-1 text-base text-slate-500">
          {OBJEKT.name}, {OBJEKT.ort} · {t.subtitle}
        </p>
      </header>

      <p className="text-lg leading-relaxed">{t.intro}</p>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-base font-semibold text-amber-900">
          {t.reassureTitel}
        </h2>
        <p className="mt-1 leading-relaxed text-amber-900/90">{t.reassure}</p>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-semibold text-slate-900">
          {t.leisteTitel}
        </h2>
        <dl className="grid gap-3 rounded-lg border border-slate-200 bg-white p-5">
          {t.leiste.map((item) => (
            <div key={item.name} className="grid gap-0.5 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <dt className="font-semibold text-slate-900">{item.name}</dt>
              <dd className="text-slate-600">{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold text-slate-900">
          {t.schritteTitel}
        </h2>
        {t.schritte.map((schritt) => (
          <div
            key={schritt.nr}
            className="grid gap-3 rounded-lg border border-slate-200 bg-white p-5 sm:grid-cols-[3rem_1fr] sm:gap-5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">
              {schritt.nr}
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {schritt.titel}
              </h3>
              <p className="leading-relaxed">{schritt.lead}</p>
              {schritt.punkte.length > 0 && (
                <ul className="grid list-disc gap-1.5 pl-5 text-slate-700 marker:text-slate-400">
                  {schritt.punkte.map((punkt, i) => (
                    <li key={i} className="leading-relaxed">
                      {punkt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-semibold text-slate-900">
          {t.herkunftTitel}
        </h2>
        <ul className="grid list-disc gap-2 rounded-lg border border-slate-200 bg-white p-5 pl-9 text-slate-700 marker:text-slate-400">
          {t.herkunft.map((eintrag, i) => (
            <li key={i} className="leading-relaxed">
              {eintrag}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-semibold text-slate-900">
          {t.wissenTitel}
        </h2>
        <ul className="grid list-disc gap-2 rounded-lg border border-slate-200 bg-white p-5 pl-9 text-slate-700 marker:text-slate-400">
          {t.wissen.map((eintrag, i) => (
            <li key={i} className="leading-relaxed">
              {eintrag}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-slate-300 bg-slate-50 p-5">
        <h2 className="text-base font-semibold text-slate-900">
          {t.schlussTitel}
        </h2>
        <p className="mt-1 leading-relaxed text-slate-700">{t.schluss}</p>
      </section>
    </div>
  );
}

import { getServerDict } from "@/lib/i18n/server";

export async function SetupHinweis() {
  const { dict } = await getServerDict();
  const t = dict.setup;
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
      <h2 className="mb-2 text-base font-semibold">{t.titel}</h2>
      <p className="mb-3">{t.intro}</p>
      <ol className="ml-4 list-decimal space-y-1">
        <li>{t.s1}</li>
        <li>
          {t.s2pre}
          <code className="rounded bg-amber-100 px-1">
            supabase/migrations/0001_init.sql
          </code>
          {t.s2post}
        </li>
        <li>
          {t.s3pre}
          <code className="rounded bg-amber-100 px-1">{t.s3mid}</code>
          {t.s3post}
        </li>
        <li>{t.s4}</li>
      </ol>
    </div>
  );
}

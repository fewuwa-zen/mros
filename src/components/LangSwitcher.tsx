"use client";

import { useRouter } from "next/navigation";
import { LANGS } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/context";
import { LANG_COOKIE } from "@/lib/i18n/cookie";

export function LangSwitcher() {
  const router = useRouter();
  const { lang } = useI18n();

  return (
    <div className="flex items-center rounded-md border border-slate-200 text-xs">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => {
            document.cookie = `${LANG_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
            router.refresh();
          }}
          aria-pressed={l === lang}
          className={
            "px-2 py-1 uppercase transition " +
            (l === lang
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100")
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}

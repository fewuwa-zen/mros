import { cookies } from "next/headers";
import { DEFAULT_LANG, getDict, isLang, type Lang } from "@/lib/i18n/dictionaries";
import { LANG_COOKIE } from "@/lib/i18n/cookie";

// Aktuelle Sprache serverseitig aus dem Cookie lesen.
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}

export async function getServerDict() {
  const lang = await getLang();
  return { lang, dict: getDict(lang) };
}

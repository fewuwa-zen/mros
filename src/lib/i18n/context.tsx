"use client";

import { createContext, useContext, useMemo } from "react";
import { getDict, type Dict, type Lang } from "@/lib/i18n/dictionaries";

type I18nValue = { lang: Lang; dict: Dict };

const I18nContext = createContext<I18nValue | null>(null);

// Nur `lang` (serialisierbar) kommt vom Server; das Wörterbuch – das auch
// Funktionen enthält – wird hier clientseitig per Import aufgelöst.
export function I18nProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nValue>(() => ({ lang, dict: getDict(lang) }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n muss innerhalb von I18nProvider genutzt werden");
  return ctx;
}

// Kurzform: nur das Wörterbuch
export function useDict(): Dict {
  return useI18n().dict;
}

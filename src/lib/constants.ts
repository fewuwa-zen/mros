// Festes Objekt dieses Tools
export const OBJEKT = {
  name: "Ragniter Allee 3 / 3a",
  ort: "Berlin",
} as const;

export const KATEGORIEN = [
  "Balkon",
  "Ablauf",
  "Regenrinne",
  "Fassade",
  "Sonstiges",
] as const;

export type Kategorie = (typeof KATEGORIEN)[number];

// Priorität 1 (höchste) bis 5 (niedrigste). Beschriftung kommt aus dem Wörterbuch.
export const PRIO_WERTE = [1, 2, 3, 4, 5] as const;

const PRIO_FARBEN: Record<number, string> = {
  1: "#dc2626",
  2: "#ea580c",
  3: "#ca8a04",
  4: "#65a30d",
  5: "#0891b2",
};

export function prioFarbe(wert: number | null | undefined): string | undefined {
  return wert ? PRIO_FARBEN[wert] : undefined;
}

export const FOTO_BUCKET = "fotos";

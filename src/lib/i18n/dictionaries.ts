// Zentrale Übersetzungen für Deutsch und Englisch.
// Die in der DB gespeicherten Werte (Kategorie-Strings, Prio-Zahlen) bleiben
// kanonisch; hier werden nur die angezeigten Beschriftungen lokalisiert.

export type Lang = "de" | "en";
export const LANGS: Lang[] = ["de", "en"];
export const DEFAULT_LANG: Lang = "de";

export type Dict = {
  langName: string;
  objektSubtitle: string;
  bearbeiter: string;
  nav: {
    bauteile: string;
    bericht: string;
    dokumente: string;
    eingang: string;
    papierkorb: string;
  };
  eingang: {
    title: string;
    subtitle: string;
    leer: string;
    bauteilWaehlen: string;
    zuweisen: (n: number) => string;
    zuweisenLaeuft: string;
    alleWaehlen: string;
    auswahlAufheben: string;
    hinweis: string;
    keinBauteil: string;
    inPapierkorb: (n: number) => string;
    inPapierkorbLaeuft: string;
  };
  papierkorb: {
    title: string;
    subtitle: string;
    leer: string;
    hinweis: string;
    alleWaehlen: string;
    auswahlAufheben: string;
    wiederherstellen: (n: number) => string;
    wiederherstellenLaeuft: string;
    endgueltig: (n: number) => string;
    endgueltigLaeuft: string;
    confirmEndgueltig: (n: number) => string;
  };
  home: {
    title: string;
    neuesBauteil: string;
    leer: string;
    suchePlaceholder: string;
    keinTreffer: string;
  };
  dokumente: {
    title: string;
    subtitle: string;
    leer: string;
    oeffnen: string;
    meta: (seiten: number, fotos: number) => string;
    upload: {
      titel: string;
      hinweis: string;
      laeuft: (i: number, n: number) => string;
      fertig: (n: number) => string;
      uploadFehler: (msg: string) => string;
      eintragFehler: (msg: string) => string;
    };
  };
  fotoMeta: { quelle: (titel: string, abb: number, seite: number) => string };
  bauteilForm: {
    neuTitel: string;
    bezeichnung: string;
    bezeichnungPh: string;
    kategorie: string;
    waehlen: string;
    lage: string;
    lagePh: string;
    beschreibung: string;
    speichern: string;
    speichernLaeuft: string;
    anlegen: string;
    abbrechen: string;
  };
  bauteil: {
    alle: string;
    ohneKatLage: string;
    bearbeiten: string;
    loeschen: string;
    bearbeitenTitel: string;
    confirmDelete: string;
  };
  upload: {
    titel: string;
    hinweis: string;
    laeuft: (i: number, n: number) => string;
    fertig: (n: number) => string;
    uploadFehler: (msg: string) => string;
    eintragFehler: (msg: string) => string;
  };
  detail: {
    nichtZugeordnet: (n: number) => string;
    befunde: string;
    keineBefunde: string;
  };
  neueGruppe: { label: string; placeholder: string; button: string };
  gruppe: {
    problem: string;
    loesung: string;
    titel: string;
    prioritaet: string;
    ohnePrio: string;
    bearbeiten: string;
    speichern: string;
    speichernLaeuft: string;
    abbrechen: string;
    gruppeLoeschen: string;
    confirmDelete: string;
    leer: string;
  };
  foto: {
    zuordnenAria: string;
    nichtZugeordnetOpt: string;
    confirmDelete: string;
    loeschen: string;
    vergroessernAria: string;
    schliessen: string;
  };
  prioBadge: { ohne: string };
  prio: Record<1 | 2 | 3 | 4 | 5, string>;
  kategorie: Record<string, string>;
  bericht: {
    title: string;
    summary: (b: number, f: number) => string;
    print: string;
    kopfTitel: string;
    objektLabel: string;
    bearbeitungLabel: (x: string) => string;
    keineDaten: string;
    keineBefunde: string;
  };
  setup: {
    titel: string;
    intro: string;
    s1: string;
    s2pre: string;
    s2post: string;
    s3pre: string;
    s3mid: string;
    s3post: string;
    s4: string;
  };
};

const de: Dict = {
  langName: "Deutsch",
  objektSubtitle: "Bauteildokumentation",
  bearbeiter: "Hr. Mros (Bauingenieur)",
  nav: {
    bauteile: "Bauteile",
    bericht: "Bericht",
    dokumente: "Dokumente",
    eingang: "Eingang",
    papierkorb: "Papierkorb",
  },
  eingang: {
    title: "Foto-Eingang",
    subtitle: "Noch nicht zugeordnete Fotos – einem Bauteil zuweisen",
    leer: "Keine unzugeordneten Fotos. Alles zugewiesen 🎉",
    bauteilWaehlen: "Bauteil wählen…",
    zuweisen: (n) => `${n} Foto(s) zuweisen`,
    zuweisenLaeuft: "Weise zu…",
    alleWaehlen: "Alle dieser Gruppe",
    auswahlAufheben: "Auswahl aufheben",
    hinweis:
      "Fotos ankreuzen, oben ein Bauteil wählen und zuweisen. Befunde innerhalb des Bauteils ordnest du danach im Bauteil zu.",
    keinBauteil:
      "Noch keine Bauteile vorhanden. Lege zuerst unter „Bauteile“ ein Bauteil an.",
    inPapierkorb: (n) => `${n} in den Papierkorb`,
    inPapierkorbLaeuft: "Verschiebe…",
  },
  papierkorb: {
    title: "Papierkorb",
    subtitle: "Aussortierte Fotos – wiederherstellen oder endgültig löschen",
    leer: "Papierkorb ist leer.",
    hinweis:
      "Diese Fotos werden im Eingang nicht mehr angezeigt. Du kannst sie wiederherstellen oder endgültig löschen.",
    alleWaehlen: "Alle wählen",
    auswahlAufheben: "Auswahl aufheben",
    wiederherstellen: (n) => `${n} wiederherstellen`,
    wiederherstellenLaeuft: "Stelle wieder her…",
    endgueltig: (n) => `${n} endgültig löschen`,
    endgueltigLaeuft: "Lösche…",
    confirmEndgueltig: (n) =>
      `${n} Foto(s) endgültig und unwiderruflich löschen?`,
  },
  home: {
    title: "Bauteile",
    neuesBauteil: "+ Neues Bauteil",
    leer: "Noch keine Bauteile angelegt. Mit „+ Neues Bauteil“ beginnen.",
    suchePlaceholder: "Bauteile durchsuchen…",
    keinTreffer: "Keine Bauteile gefunden.",
  },
  dokumente: {
    title: "Dokumente",
    subtitle: "Gutachten (PDF) zum Objekt",
    leer: "Noch keine Dokumente hochgeladen.",
    oeffnen: "PDF öffnen",
    meta: (seiten, fotos) => `${seiten} Seiten · ${fotos} Fotos importiert`,
    upload: {
      titel: "Dokument hochladen",
      hinweis: "Ein oder mehrere PDFs auswählen",
      laeuft: (i, n) => `Lade hoch… (${i}/${n})`,
      fertig: (n) => `${n} Dokument(e) hochgeladen`,
      uploadFehler: (msg) => `Upload fehlgeschlagen: ${msg}`,
      eintragFehler: (msg) => `Eintrag fehlgeschlagen: ${msg}`,
    },
  },
  fotoMeta: {
    quelle: (titel, abb, seite) => `${titel} · Abb. ${abb} (S. ${seite})`,
  },
  bauteilForm: {
    neuTitel: "Neues Bauteil anlegen",
    bezeichnung: "Bezeichnung *",
    bezeichnungPh: "z. B. Balkon Whg. 3a, 2. OG",
    kategorie: "Kategorie",
    waehlen: "– wählen –",
    lage: "Lage",
    lagePh: "Aufgang / Etage / Wohnung",
    beschreibung: "Beschreibung",
    speichern: "Speichern",
    speichernLaeuft: "Speichern…",
    anlegen: "Bauteil anlegen",
    abbrechen: "Abbrechen",
  },
  bauteil: {
    alle: "← Alle Bauteile",
    ohneKatLage: "Ohne Kategorie/Lage",
    bearbeiten: "Bearbeiten",
    loeschen: "Löschen",
    bearbeitenTitel: "Bauteil bearbeiten",
    confirmDelete: "Bauteil inkl. aller Befunde und Fotos löschen?",
  },
  upload: {
    titel: "Fotos hochladen",
    hinweis: "Ein oder mehrere Bilder auswählen",
    laeuft: (i, n) => `Lade hoch… (${i}/${n})`,
    fertig: (n) => `${n} Foto(s) hochgeladen`,
    uploadFehler: (msg) => `Upload fehlgeschlagen: ${msg}`,
    eintragFehler: (msg) => `Eintrag fehlgeschlagen: ${msg}`,
  },
  detail: {
    nichtZugeordnet: (n) => `Nicht zugeordnete Fotos (${n})`,
    befunde: "Befunde",
    keineBefunde:
      "Noch keine Befunde. Lege oben einen an und ordne ihm Fotos zu.",
  },
  neueGruppe: {
    label: "Neuer Befund (Titel)",
    placeholder: "z. B. Rissbildung Betonbrüstung",
    button: "+ Befund",
  },
  gruppe: {
    problem: "Problem / Fehler",
    loesung: "Lösung / Instandsetzung",
    titel: "Titel",
    prioritaet: "Priorität",
    ohnePrio: "– ohne –",
    bearbeiten: "Bearbeiten",
    speichern: "Speichern",
    speichernLaeuft: "Speichern…",
    abbrechen: "Abbrechen",
    gruppeLoeschen: "Gruppe löschen",
    confirmDelete: "Befund-Gruppe löschen? Fotos bleiben erhalten.",
    leer: "",
  },
  foto: {
    zuordnenAria: "Fotogruppe zuordnen",
    nichtZugeordnetOpt: "– nicht zugeordnet –",
    confirmDelete: "Foto löschen?",
    loeschen: "löschen",
    vergroessernAria: "Foto vergrößern",
    schliessen: "Schließen",
  },
  prioBadge: { ohne: "ohne Prio" },
  prio: {
    1: "1 – Sofort",
    2: "2 – Hoch",
    3: "3 – Mittel",
    4: "4 – Gering",
    5: "5 – Beobachten",
  },
  kategorie: {
    Balkon: "Balkon",
    Ablauf: "Ablauf",
    Regenrinne: "Regenrinne",
    Fassade: "Fassade",
    Sonstiges: "Sonstiges",
  },
  bericht: {
    title: "Befundbericht",
    summary: (b, f) => `${b} Bauteile · ${f} Befunde`,
    print: "Als PDF speichern / drucken",
    kopfTitel: "Befund- und Instandsetzungsbericht",
    objektLabel: "Objekt:",
    bearbeitungLabel: (x) => `Bearbeitung: ${x}`,
    keineDaten: "Noch keine Daten erfasst.",
    keineBefunde: "Keine Befunde erfasst.",
  },
  setup: {
    titel: "Supabase noch nicht verbunden",
    intro:
      "Die App ist fertig gebaut, aber es fehlen noch die Zugangsdaten zu einem Supabase-Projekt. So wird sie scharf geschaltet:",
    s1: "Auf supabase.com ein Projekt anlegen.",
    s2pre: "Im SQL-Editor den Inhalt von ",
    s2post: " ausführen.",
    s3pre: "Unter Project Settings → API die Project-URL und den Publishable Key kopieren und in ",
    s3mid: ".env.local",
    s3post: " eintragen.",
    s4: "Dev-Server neu starten.",
  },
};

const en: Dict = {
  langName: "English",
  objektSubtitle: "Component documentation",
  bearbeiter: "Mr. Mros (structural engineer)",
  nav: {
    bauteile: "Components",
    bericht: "Report",
    dokumente: "Documents",
    eingang: "Inbox",
    papierkorb: "Trash",
  },
  eingang: {
    title: "Photo inbox",
    subtitle: "Unassigned photos – assign them to a component",
    leer: "No unassigned photos. All assigned 🎉",
    bauteilWaehlen: "Select component…",
    zuweisen: (n) => `Assign ${n} photo(s)`,
    zuweisenLaeuft: "Assigning…",
    alleWaehlen: "All in this group",
    auswahlAufheben: "Clear selection",
    hinweis:
      "Check photos, pick a component above and assign. You then sort them into findings inside the component.",
    keinBauteil:
      "No components yet. Create one under “Components” first.",
    inPapierkorb: (n) => `Move ${n} to trash`,
    inPapierkorbLaeuft: "Moving…",
  },
  papierkorb: {
    title: "Trash",
    subtitle: "Discarded photos – restore or delete permanently",
    leer: "Trash is empty.",
    hinweis:
      "These photos no longer appear in the inbox. You can restore them or delete them permanently.",
    alleWaehlen: "Select all",
    auswahlAufheben: "Clear selection",
    wiederherstellen: (n) => `Restore ${n}`,
    wiederherstellenLaeuft: "Restoring…",
    endgueltig: (n) => `Delete ${n} permanently`,
    endgueltigLaeuft: "Deleting…",
    confirmEndgueltig: (n) => `Permanently and irreversibly delete ${n} photo(s)?`,
  },
  home: {
    title: "Components",
    neuesBauteil: "+ New component",
    leer: "No components yet. Start with “+ New component”.",
    suchePlaceholder: "Search components…",
    keinTreffer: "No components found.",
  },
  dokumente: {
    title: "Documents",
    subtitle: "Reports (PDF) for the property",
    leer: "No documents uploaded yet.",
    oeffnen: "Open PDF",
    meta: (seiten, fotos) => `${seiten} pages · ${fotos} photos imported`,
    upload: {
      titel: "Upload document",
      hinweis: "Select one or more PDFs",
      laeuft: (i, n) => `Uploading… (${i}/${n})`,
      fertig: (n) => `${n} document(s) uploaded`,
      uploadFehler: (msg) => `Upload failed: ${msg}`,
      eintragFehler: (msg) => `Saving entry failed: ${msg}`,
    },
  },
  fotoMeta: {
    quelle: (titel, abb, seite) => `${titel} · Fig. ${abb} (p. ${seite})`,
  },
  bauteilForm: {
    neuTitel: "Add new component",
    bezeichnung: "Name *",
    bezeichnungPh: "e.g. Balcony apt. 3a, 2nd floor",
    kategorie: "Category",
    waehlen: "– select –",
    lage: "Location",
    lagePh: "Entrance / floor / apartment",
    beschreibung: "Description",
    speichern: "Save",
    speichernLaeuft: "Saving…",
    anlegen: "Create component",
    abbrechen: "Cancel",
  },
  bauteil: {
    alle: "← All components",
    ohneKatLage: "No category/location",
    bearbeiten: "Edit",
    loeschen: "Delete",
    bearbeitenTitel: "Edit component",
    confirmDelete: "Delete component including all findings and photos?",
  },
  upload: {
    titel: "Upload photos",
    hinweis: "Select one or more images",
    laeuft: (i, n) => `Uploading… (${i}/${n})`,
    fertig: (n) => `${n} photo(s) uploaded`,
    uploadFehler: (msg) => `Upload failed: ${msg}`,
    eintragFehler: (msg) => `Saving entry failed: ${msg}`,
  },
  detail: {
    nichtZugeordnet: (n) => `Unassigned photos (${n})`,
    befunde: "Findings",
    keineBefunde: "No findings yet. Create one above and assign photos to it.",
  },
  neueGruppe: {
    label: "New finding (title)",
    placeholder: "e.g. Cracking in concrete parapet",
    button: "+ Finding",
  },
  gruppe: {
    problem: "Problem / defect",
    loesung: "Solution / repair",
    titel: "Title",
    prioritaet: "Priority",
    ohnePrio: "– none –",
    bearbeiten: "Edit",
    speichern: "Save",
    speichernLaeuft: "Saving…",
    abbrechen: "Cancel",
    gruppeLoeschen: "Delete group",
    confirmDelete: "Delete finding group? Photos are kept.",
    leer: "",
  },
  foto: {
    zuordnenAria: "Assign to finding",
    nichtZugeordnetOpt: "– unassigned –",
    confirmDelete: "Delete photo?",
    loeschen: "delete",
    vergroessernAria: "Enlarge photo",
    schliessen: "Close",
  },
  prioBadge: { ohne: "no priority" },
  prio: {
    1: "1 – Immediate",
    2: "2 – High",
    3: "3 – Medium",
    4: "4 – Low",
    5: "5 – Monitor",
  },
  kategorie: {
    Balkon: "Balcony",
    Ablauf: "Drain",
    Regenrinne: "Gutter",
    Fassade: "Facade",
    Sonstiges: "Other",
  },
  bericht: {
    title: "Findings report",
    summary: (b, f) => `${b} components · ${f} findings`,
    print: "Save as PDF / print",
    kopfTitel: "Findings & repair report",
    objektLabel: "Property:",
    bearbeitungLabel: (x) => `Prepared by: ${x}`,
    keineDaten: "No data recorded yet.",
    keineBefunde: "No findings recorded.",
  },
  setup: {
    titel: "Supabase not connected yet",
    intro:
      "The app is built, but the credentials for a Supabase project are still missing. To go live:",
    s1: "Create a project at supabase.com.",
    s2pre: "In the SQL editor, run the contents of ",
    s2post: ".",
    s3pre: "Under Project Settings → API copy the project URL and the publishable key into ",
    s3mid: ".env.local",
    s3post: ".",
    s4: "Restart the dev server.",
  },
};

export const dictionaries: Record<Lang, Dict> = { de, en };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang] ?? de;
}

export function isLang(v: unknown): v is Lang {
  return v === "de" || v === "en";
}

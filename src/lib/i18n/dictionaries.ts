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
    anleitung: string;
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
  anleitung: {
    title: string;
    subtitle: string;
    intro: string;
    reassureTitel: string;
    reassure: string;
    leisteTitel: string;
    leiste: { name: string; text: string }[];
    schritteTitel: string;
    schritte: { nr: number; titel: string; lead: string; punkte: string[] }[];
    herkunftTitel: string;
    herkunft: string[];
    wissenTitel: string;
    wissen: string[];
    schlussTitel: string;
    schluss: string;
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
    anleitung: "Anleitung",
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
  anleitung: {
    title: "So benutzen Sie das mros-Tool",
    subtitle: "Fotos ordnen und Befunde festhalten — Schritt für Schritt",
    intro:
      "Mit diesem Tool bringen Sie die Fotos vom Objekt in eine klare Ordnung und halten zu jedem Bauteil fest, was das Problem ist und wie es behoben wird. Daraus entsteht am Ende automatisch ein sauberer Bericht. Nehmen Sie sich Zeit und gehen Sie die vier Schritte unten der Reihe nach durch.",
    reassureTitel: "Keine Sorge",
    reassure:
      "Sie müssen nichts auswendig wissen — diese Seite ist jederzeit über „Anleitung“ oben in der Leiste erreichbar. Vieles lässt sich rückgängig machen: Aus dem Eingang aussortierte Fotos landen im Papierkorb und können wiederhergestellt werden. Vor jedem endgültigen Löschen werden Sie ausdrücklich gefragt.",
    leisteTitel: "Die Leiste oben",
    leiste: [
      {
        name: "Bauteile",
        text: "Ihre Liste aller Bauteile (z. B. einzelne Balkone). Das ist Ihr Ausgangspunkt.",
      },
      {
        name: "Eingang",
        text: "Alle Fotos, die noch keinem Bauteil zugeordnet sind. Die orange Zahl zeigt, wie viele noch warten.",
      },
      {
        name: "Dokumente",
        text: "Hinterlegte Gutachten als PDF. Beim Hochladen werden enthaltene Fotos automatisch in den Eingang übernommen.",
      },
      {
        name: "Papierkorb",
        text: "Aussortierte Fotos — von hier zurückholen oder endgültig entfernen.",
      },
      {
        name: "Bericht",
        text: "Die fertige Übersicht aller Befunde, zum Ansehen und als PDF speichern.",
      },
    ],
    schritteTitel: "Der Ablauf in vier Schritten",
    schritte: [
      {
        nr: 1,
        titel: "Ein Bauteil anlegen",
        lead: "Klicken Sie auf „Bauteile“ und dann auf „+ Neues Bauteil“.",
        punkte: [
          "Geben Sie eine Bezeichnung ein, z. B. „Balkon Whg. 3a, 2. OG“.",
          "Kategorie (Balkon, Ablauf, Regenrinne, Fassade, Sonstiges) und Lage sind hilfreich, aber freiwillig.",
          "Mit „Bauteil anlegen“ speichern. Legen Sie ruhig gleich alle Bauteile an, die Sie am Objekt haben.",
        ],
      },
      {
        nr: 2,
        titel: "Fotos einem Bauteil zuweisen",
        lead: "Neue Fotos sammeln sich im „Eingang“. Ordnen Sie sie dem passenden Bauteil zu:",
        punkte: [
          "Kreuzen Sie die Fotos an, die zum selben Bauteil gehören — mit „Alle dieser Gruppe“ auf einmal.",
          "Wählen Sie oben im Feld „Bauteil wählen…“ das passende Bauteil.",
          "Klicken Sie auf „… Foto(s) zuweisen“. Die Fotos wandern damit in das Bauteil.",
          "Fotos, die Sie nicht brauchen, markieren und mit „… in den Papierkorb“ beiseiteschieben — sie sind dort sicher und nicht verloren.",
        ],
      },
      {
        nr: 3,
        titel: "Einen Befund erfassen",
        lead: "Öffnen Sie ein Bauteil (in der Liste „Bauteile“ anklicken). Hier beschreiben Sie die Probleme.",
        punkte: [
          "Tippen Sie oben bei „Neuer Befund (Titel)“ einen kurzen Titel ein (z. B. „Rissbildung Betonbrüstung“) und klicken auf „+ Befund“.",
          "Klicken Sie beim Befund auf „Bearbeiten“ und füllen Sie aus: „Problem / Fehler“ (was ist mangelhaft?), „Lösung / Instandsetzung“ (wie wird es behoben?) und die Priorität von „1 – Sofort“ bis „5 – Beobachten“. Mit „Speichern“ sichern.",
          "Fotos zum Befund zuordnen: Jedes Foto des Bauteils hat ein kleines Auswahlfeld — wählen Sie dort den passenden Befund. So sieht man später sofort, welches Bild zu welchem Problem gehört.",
        ],
      },
      {
        nr: 4,
        titel: "Den Bericht erstellen",
        lead: "Wenn alles erfasst ist, klicken Sie oben auf „Bericht“.",
        punkte: [
          "Dort stehen alle Bauteile mit ihren Befunden, Fotos und Prioritäten ordentlich zusammengefasst.",
          "Mit „Als PDF speichern / drucken“ machen Sie daraus ein fertiges Dokument zum Versenden oder Ablegen.",
        ],
      },
    ],
    herkunftTitel: "Woher kommen die Fotos?",
    herkunft: [
      "Aus Gutachten: Wenn Sie unter „Dokumente“ ein PDF hochladen, werden die enthaltenen Fotos automatisch in den Eingang übernommen.",
      "Direkt am Bauteil: Auf der Seite eines Bauteils können Sie ganz unten über „Fotos hochladen“ eigene Bilder hinzufügen. Diese liegen dann gleich beim Bauteil unter „nicht zugeordnet“ bereit.",
    ],
    wissenTitel: "Gut zu wissen",
    wissen: [
      "Foto vergrößern: Foto anklicken; mit „Schließen“ oder der Esc-Taste wieder zu.",
      "Versehentlich aussortiert? Im „Papierkorb“ das Foto auswählen und „wiederherstellen“.",
      "Ein einzelnes Foto am Bauteil über „löschen“ zu entfernen, wird vorher nachgefragt und ist danach endgültig.",
      "Bauteil suchen: Auf der Bauteile-Seite über das Suchfeld schnell wiederfinden.",
      "Sprache: oben rechts zwischen Deutsch und Englisch umstellbar.",
      "Ihre Eingaben werden sofort gespeichert — es gibt keinen extra „Alles sichern“-Knopf.",
    ],
    schlussTitel: "In Kürze",
    schluss:
      "Bauteil anlegen → Fotos zuweisen → Befund mit Problem & Lösung erfassen → Bericht als PDF. Bei Unsicherheit hilft ein Blick zurück auf diese Seite.",
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
    anleitung: "Guide",
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
  anleitung: {
    title: "How to use the mros tool",
    subtitle: "Organise photos and record findings — step by step",
    intro:
      "This tool brings the photos of the property into a clear order and records, for every component, what the problem is and how it will be fixed. From that a clean report is produced automatically at the end. Take your time and work through the four steps below in order.",
    reassureTitel: "Don't worry",
    reassure:
      "You don't need to memorise anything — this page is always available via “Guide” in the bar at the top. Much can be undone: photos discarded from the inbox land in the trash and can be restored. Before anything is deleted permanently you are asked explicitly.",
    leisteTitel: "The bar at the top",
    leiste: [
      {
        name: "Components",
        text: "Your list of all components (e.g. individual balconies). This is your starting point.",
      },
      {
        name: "Inbox",
        text: "All photos not yet assigned to a component. The orange number shows how many are still waiting.",
      },
      {
        name: "Documents",
        text: "Stored reports as PDF. On upload, the photos they contain are added to the inbox automatically.",
      },
      {
        name: "Trash",
        text: "Discarded photos — restore them here or remove them permanently.",
      },
      {
        name: "Report",
        text: "The finished overview of all findings, to view and save as PDF.",
      },
    ],
    schritteTitel: "The process in four steps",
    schritte: [
      {
        nr: 1,
        titel: "Create a component",
        lead: "Click “Components” and then “+ New component”.",
        punkte: [
          "Enter a name, e.g. “Balcony apt. 3a, 2nd floor”.",
          "Category (balcony, drain, gutter, facade, other) and location are helpful but optional.",
          "Save with “Create component”. Feel free to create all the components you have on site right away.",
        ],
      },
      {
        nr: 2,
        titel: "Assign photos to a component",
        lead: "New photos collect in the “Inbox”. Assign them to the right component:",
        punkte: [
          "Check the photos that belong to the same component — use “All in this group” to select them at once.",
          "Pick the right component in the “Select component…” field at the top.",
          "Click “Assign … photo(s)”. The photos then move into the component.",
          "Photos you don't need: select them and set them aside with “Move … to trash” — they are safe there and not lost.",
        ],
      },
      {
        nr: 3,
        titel: "Record a finding",
        lead: "Open a component (click it in the “Components” list). Here you describe the problems.",
        punkte: [
          "At the top, type a short title under “New finding (title)” (e.g. “Cracking in concrete parapet”) and click “+ Finding”.",
          "Click “Edit” on the finding and fill in: “Problem / defect” (what is wrong?), “Solution / repair” (how will it be fixed?) and the priority from “1 – Immediate” to “5 – Monitor”. Save with “Save”.",
          "Assign photos to the finding: every photo of the component has a small selector — pick the matching finding there. Later you can see at a glance which image belongs to which problem.",
        ],
      },
      {
        nr: 4,
        titel: "Create the report",
        lead: "Once everything is recorded, click “Report” at the top.",
        punkte: [
          "It lists all components with their findings, photos and priorities, neatly summarised.",
          "With “Save as PDF / print” you turn it into a finished document to send or file.",
        ],
      },
    ],
    herkunftTitel: "Where do the photos come from?",
    herkunft: [
      "From reports: when you upload a PDF under “Documents”, the photos it contains are added to the inbox automatically.",
      "Directly on the component: on a component's page you can add your own images at the very bottom via “Upload photos”. They are then ready under “unassigned” on that component.",
    ],
    wissenTitel: "Good to know",
    wissen: [
      "Enlarge a photo: click it; close again with “Close” or the Esc key.",
      "Discarded by mistake? Select the photo in “Trash” and choose “Restore”.",
      "Removing a single photo on a component via “delete” asks first and is permanent afterwards.",
      "Find a component: use the search field on the Components page.",
      "Language: switchable between German and English at the top right.",
      "Your entries are saved immediately — there is no separate “Save all” button.",
    ],
    schlussTitel: "In short",
    schluss:
      "Create component → assign photos → record finding with problem & solution → report as PDF. When unsure, a look back at this page helps.",
  },
};

export const dictionaries: Record<Lang, Dict> = { de, en };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang] ?? de;
}

export function isLang(v: unknown): v is Lang {
  return v === "de" || v === "en";
}

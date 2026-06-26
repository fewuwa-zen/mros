// Datenmodell (entspricht supabase/migrations/0001_init.sql)

export type Bauteil = {
  id: string;
  name: string;
  kategorie: string | null;
  lage: string | null;
  beschreibung: string | null;
  created_at: string;
};

export type Fotogruppe = {
  id: string;
  bauteil_id: string;
  titel: string;
  problem: string | null;
  loesung: string | null;
  prioritaet: number | null;
  created_at: string;
};

export type Foto = {
  id: string;
  bauteil_id: string;
  fotogruppe_id: string | null;
  storage_path: string;
  dateiname: string | null;
  dokument_id: string | null;
  quelle_seite: number | null;
  abbildung_nr: number | null;
  befund: string | null;
  created_at: string;
  geloescht_am: string | null;
};

export type Dokument = {
  id: string;
  dateiname: string;
  titel: string | null;
  datum: string | null;
  seiten: number | null;
  storage_path: string;
  created_at: string;
};

// Angereicherte Typen für die Anzeige
export type FotoMitUrl = Foto & {
  url: string;
  dokument_titel?: string | null;
};

export type DokumentMitUrl = Dokument & { url: string; fotos: number };

export type FotogruppeMitFotos = Fotogruppe & { fotos: FotoMitUrl[] };

export type BauteilDetail = Bauteil & {
  gruppen: FotogruppeMitFotos[];
  ungeordnet: FotoMitUrl[];
};

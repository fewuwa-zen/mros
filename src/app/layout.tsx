import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { OBJEKT } from "@/lib/constants";
import { countUnzugeordnet } from "@/lib/data";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getServerDict } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/context";
import { LangSwitcher } from "@/components/LangSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mros – Ragniter Allee 3/3a",
  description: "Erfassung von Bauteilen, Befunden und Instandsetzungen",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang, dict } = await getServerDict();
  let eingangCount = 0;
  if (supabaseConfigured()) {
    try {
      eingangCount = await countUnzugeordnet();
    } catch {
      eingangCount = 0;
    }
  }

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <I18nProvider lang={lang}>
          <header className="no-print border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
              <Link href="/" className="flex flex-col leading-tight">
                <span className="text-base font-semibold text-slate-900">
                  {OBJEKT.name}
                </span>
                <span className="text-xs text-slate-500">
                  {dict.objektSubtitle} · {OBJEKT.ort}
                </span>
              </Link>
              <nav className="flex items-center gap-2 text-sm">
                <Link
                  href="/"
                  className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                >
                  {dict.nav.bauteile}
                </Link>
                <Link
                  href="/eingang"
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                >
                  {dict.nav.eingang}
                  {eingangCount > 0 && (
                    <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
                      {eingangCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/dokumente"
                  className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                >
                  {dict.nav.dokumente}
                </Link>
                <Link
                  href="/papierkorb"
                  className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                >
                  {dict.nav.papierkorb}
                </Link>
                <Link
                  href="/bericht"
                  className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-slate-700"
                >
                  {dict.nav.bericht}
                </Link>
                <LangSwitcher />
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}

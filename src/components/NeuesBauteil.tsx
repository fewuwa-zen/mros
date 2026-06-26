"use client";

import { useState } from "react";
import { BauteilForm } from "@/components/BauteilForm";
import { useDict } from "@/lib/i18n/context";

export function NeuesBauteil() {
  const dict = useDict();
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        {dict.home.neuesBauteil}
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        {dict.bauteilForm.neuTitel}
      </h2>
      {/* createBauteil leitet nach Erfolg auf die Detailseite weiter */}
      <BauteilForm onDone={() => setOpen(false)} />
    </div>
  );
}

"use client";

import { useState } from "react";
import FormLogin from "@/components/forms/formLogin";
import CardTribo from "@/components/cardTribo";
import { tribos } from "@/constants";

export default function Page() {
  const [selected, setSelected] = useState<(typeof tribos)[number] | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-3xl font-bold mb-12">Qual tribo?</h1>

      <div className="text-center mb-12">
        <h2 className="font-semibold text-2xl mb-8 text-white">School</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {tribos
            .filter((p) => p.ministerio === "School")
            .map((p) => (
              <CardTribo key={p.id} profile={p} setSelected={setSelected} />
            ))}
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="font-semibold text-2xl mb-8 text-white">JR</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {tribos
            .filter((p) => p.ministerio === "JR")
            .map((p) => (
              <CardTribo key={p.id} profile={p} setSelected={setSelected} />
            ))}
        </div>
      </div>

      {selected && (
        <FormLogin
          triboSlug={selected.name}
          triboNome={selected.name}
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        />
      )}
    </div>
  );
}

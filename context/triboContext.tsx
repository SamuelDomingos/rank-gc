"use client";

import { useEffect } from "react";

export function TriboProvider({
  children,
  triboName,
}: {
  children: React.ReactNode;
  triboName: string;
}) {

  useEffect(() => {

    document.documentElement.classList.remove(
      "hope",
      "sent",
      "hazak"
    );

    document.documentElement.classList.add(`${triboName}`);

    return () => {
      document.documentElement.classList.remove(
        `${triboName}`
      );
    };
  }, [triboName]);

  return <>{children}</>;
}

export function useTribo() {
  return null;
}
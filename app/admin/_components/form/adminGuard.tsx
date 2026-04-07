"use client";

import { useSession } from "next-auth/react";
import LoginAdmin from "./loginAdmin";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session || session.user.cargo !== "ADMIN") {
    return <LoginAdmin open={true} />;
  }

  return <>{children}</>;
}

import "./tribos.css";
import { TriboProvider } from "@/context/triboContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function TriboLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  if (session.user.triboSlug !== name) {
    redirect("/");
  }

  return <TriboProvider triboName={name}>{children}</TriboProvider>;
}
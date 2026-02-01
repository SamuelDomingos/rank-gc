import "./tribos.css";
import { TriboProvider } from "@/context/triboContext";

export default async function TiboLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return <TriboProvider triboName={name}>{children}</TriboProvider>;
}

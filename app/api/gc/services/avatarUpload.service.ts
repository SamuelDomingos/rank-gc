import { writeFile } from "fs/promises";
import path from "path";

export async function handleAvatarUpload(file: File | null) {
  if (!file || file.size === 0) return undefined;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Tipo de arquivo não permitido");
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("Arquivo muito grande (máx 5MB)");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
  const filePath = path.join(
    process.cwd(),
    "public/uploads/avatars",
    fileName
  );

  await writeFile(filePath, buffer);

  return `/uploads/avatars/${fileName}`;
}

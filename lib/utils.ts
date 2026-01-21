import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateIso: Date): string {
  if (!dateIso) return "";
  try {
    const date = new Date(dateIso);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function presenceLabel(field: string): string {
  switch (field) {
    case "presenceGC":
      return "GC";
    case "presenceCults":
      return "Culto";
    default:
      return field;
  }
}


export function mapCategoryLabel(category: string): string {
  switch (category) {
    case "FoodBaskets":
      return "Cestas Básicas";
    case "Visitors":
      return "Visitantes";
    case "GCPresence":
      return "Presença no GC";
    case "WorshipPresence":
      return "Presença nos Cultos";
    case "Serving":
      return "Servindo";
    default:
      return category;
  }
}

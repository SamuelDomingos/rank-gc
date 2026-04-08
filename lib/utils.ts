import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function formatCurrency(value: number | string) {
  const numberValue = typeof value === "string" ? Number(value) : value;

  if (!numberValue) return "R$ 0,00";

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const formatValue = (
  value: number | string,
  isPercentage: boolean = false,
  isCurrency: boolean = false,
) => {
  if (isCurrency) return formatCurrency(Number(value));
  if (isPercentage)
    return `${typeof value === "string" ? value : value.toFixed(1)}%`;
  return value.toString();
};

export function currencyToNumber(value: string) {
  return Number(value.replace(/\D/g, "")) / 100;
}
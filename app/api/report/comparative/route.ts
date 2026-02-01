"use server";

import { NextRequest, NextResponse } from "next/server";
import { getComparative } from "../services/index.service";

export async function GET(request: NextRequest) {
  try {
    const currentMonth = Number(request.nextUrl.searchParams.get("currentMonth"));
    const currentYear = Number(request.nextUrl.searchParams.get("currentYear"));
    const previousMonth = Number(
      request.nextUrl.searchParams.get("previousMonth"),
    );
    const previousYear = Number(
      request.nextUrl.searchParams.get("previousYear"),
    );
    const tribo = request.nextUrl.searchParams.get("tribo");

    const summary = await getComparative(
      currentMonth,
      currentYear,
      previousMonth,
      previousYear,
      tribo!
    );
    return NextResponse.json(summary);
  } catch (erro) {
    console.error("Erro ao trazer o resumo:", erro);
    return NextResponse.json(
      { error: "Erro ao trazer o resumo" },
      { status: 500 },
    );
  }
}

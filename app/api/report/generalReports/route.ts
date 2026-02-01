"use server";

import { NextRequest, NextResponse } from "next/server";
import { getDashboardStats } from "../services/index.service";

export async function GET(request: NextRequest) {
  try {
    const month = Number(request.nextUrl.searchParams.get("month"));
    const year = Number(request.nextUrl.searchParams.get("year"));
    const tribo = request.nextUrl.searchParams.get("tribo");

    const summary = await getDashboardStats(month, year, tribo!);
    return NextResponse.json(summary);
  } catch (erro) {
    console.error("Erro ao trazer o resumo:", erro);
    return NextResponse.json(
      { error: "Erro ao trazer o resumo" },
      { status: 500 },
    );
  }
}

"use server";

import { NextRequest, NextResponse } from "next/server";
import { ConfigService } from "./services/index.service";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const result = await ConfigService.create(json);

    if (result.success) {
      return NextResponse.json(result.data, { status: 201 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (erro) {
    console.error("Erro ao processar dados:", erro);
    return NextResponse.json(
      { error: "Erro ao processar dados" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = String(request.nextUrl.searchParams.get("id"));
    const json = await request.json();

    const result = await ConfigService.update(id, json);

    if (result.success) {
      return NextResponse.json(result.data, { status: 201 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (erro) {
    console.error("Erro ao processar dados:", erro);
    return NextResponse.json(
      { error: "Erro ao processar dados" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const month = Number(request.nextUrl.searchParams.get("month"));
    const year = Number(request.nextUrl.searchParams.get("year"));

    const summary = await ConfigService.getConfig(month, year);
    return NextResponse.json(summary);
  } catch (erro) {
    console.error("Erro ao trazer o resumo:", erro);
    return NextResponse.json(
      { error: "Erro ao trazer o resumo" },
      { status: 500 },
    );
  }
}

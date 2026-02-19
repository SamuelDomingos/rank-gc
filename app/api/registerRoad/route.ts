
import { NextRequest, NextResponse } from "next/server";
import { gcService } from "./services/index.service";

export async function POST(request: NextRequest) {
    try {
        const json = await request.json();

        const result = await gcService.registerBasketsGc(json);

        if (result.success) {
            return NextResponse.json(result.data, { status: 201 });
        } else {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (erro) {
        console.error("Erro ao processar dados:", erro);
        return NextResponse.json(
            { error: "Erro ao processar dados" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const json = await request.json();
        const id = String(json.id);

        const result = await gcService.updateBasketsGc(id, json);

        if (result.success) {
            return NextResponse.json(result.data, { status: 201 });
        } else {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (erro) {
        console.error("Erro ao processar dados:", erro);
        return NextResponse.json(
            { error: "Erro ao processar dados" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const month = Number(request.nextUrl.searchParams.get("month"));
        const year = Number(request.nextUrl.searchParams.get("year"));
        const id = String(request.nextUrl.searchParams.get("id"));

        const summary = await gcService.getRegistersRoadGc(id, month, year);
        return NextResponse.json(summary);
    } catch (erro) {
        console.error("Erro ao trazer o resumo:", erro);
        return NextResponse.json(
            { error: "Erro ao trazer o resumo" },
            { status: 500 }
        );
    }
}
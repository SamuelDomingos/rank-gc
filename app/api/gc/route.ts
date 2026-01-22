"use server";

import { NextRequest, NextResponse } from "next/server";
import { gcService } from "./services/index.service";

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const result = await gcService.createGC(formData);

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
        const id = String(request.nextUrl.searchParams.get("id"));
        const formData = await request.formData();

        const result = await gcService.updateGC(id, formData);

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

        const summary = await gcService.getAllGCs(month, year);
        return NextResponse.json(summary);
    } catch (erro) {
        console.error("Erro ao trazer o resumo:", erro);
        return NextResponse.json(
            { error: "Erro ao trazer o resumo" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = String(request.nextUrl.searchParams.get("id"));

        const result = await gcService.deleteGC(id);

        if (result.success) {
            return NextResponse.json(result, { status: 201 });
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

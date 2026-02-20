import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    // const result = await gcService.registerBasketsGc(json);

    // if (result.success) {
    //     return NextResponse.json(result.data, { status: 201 });
    // } else {
    //     return NextResponse.json({ error: result.error }, { status: 400 });
    // }
    return NextResponse.json("sucesso", { status: 201 });
  } catch (erro) {
    console.error("Erro ao processar dados:", erro);
    return NextResponse.json(
      { error: "Erro ao processar dados" },
      { status: 500 },
    );
  }
}

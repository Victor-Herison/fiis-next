import { NextResponse } from "next/server";
import { FiiModel } from "@/utils/schema";
import connectDB from "@/utils/db";

export async function GET(req, { params }) {
    await connectDB();
    
    // Certifique-se de que `params` foi corretamente desestruturado
    const {papel} = await params;

    try {

        const fii = await FiiModel.findOne({ papel: papel.toUpperCase() });

        if (!fii) {
            return NextResponse.json({ error: "FII não encontrado" }, { status: 404 });
        }

        return NextResponse.json(fii);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Erro ao buscar FII" }, { status: 500 });
    }
}

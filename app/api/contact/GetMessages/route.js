import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import { ContactModel } from '@/utils/schema.js';

export async function GET(req) {
    await connectDB();
    const authHeader = req.headers.get("authorization");

    if (authHeader !== `${process.env.API_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const contatos = await ContactModel.find().sort({ data: -1 }); // Ordena por data decrescente
      return NextResponse.json(contatos, { status: 200 });
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      return NextResponse.json({ error: 'Erro interno ao buscar mensagens.' }, { status: 500 });
    }
  }  
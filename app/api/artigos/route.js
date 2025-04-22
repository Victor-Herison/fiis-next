import { NextResponse } from 'next/server';
import connectDB from "@/utils/db";
import { ArticleModel } from '@/utils/schema';

export async function POST(req) {
  await connectDB(); // Conecta ao banco de dados

  try {
    const { title, description, text, date } = await req.json();

    // Cria um novo artigo
    const newArticle = new ArticleModel({
      title,
      description,
      text,
      date
    });

    // Salva no banco
    await newArticle.save();

    return NextResponse.json({
      message: "✅ Artigo criado com sucesso!",
      article: newArticle
    });

  } catch (error) {
    console.error("❌ Erro ao salvar artigo:", error);

    return NextResponse.json(
      { message: "❌ Erro ao criar artigo", error: error.message },
      { status: 500 }
    );
  }
}

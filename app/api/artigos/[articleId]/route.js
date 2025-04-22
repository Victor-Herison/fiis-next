import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import { ArticleModel } from '@/utils/schema';

export async function GET(request, context) {
  await connectDB();

  const { articleId } = await context.params;

  try {
    const article = await ArticleModel.findById(articleId);

    if (!article) {
      return NextResponse.json({ error: "Artigo não encontrado." }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Erro ao buscar artigo:", error);
    return NextResponse.json({ error: "Erro ao buscar artigo." }, { status: 500 });
  }
}

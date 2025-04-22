import { NextResponse } from 'next/server';
import connectDB from "@/utils/db";
import { ArticleModel } from '@/utils/schema';

export async function GET() {
  await connectDB();

  const articles = await ArticleModel.find(); // array de artigos

  return NextResponse.json(articles); // <-- retorna array puro
}


export async function POST(req) {
    await connectDB();
  
    const authHeader = req.headers.get("authorization");
  
    if (authHeader !== `${process.env.API_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const { title, description, text, date } = await req.json();
      const newArticle = new ArticleModel({ title, description, text, date });
      await newArticle.save();
  
      return NextResponse.json({ message: "Artigo salvo com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao salvar artigo:", error);
      return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
  }
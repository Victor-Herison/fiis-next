"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/artigos/${articleId}`);
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Erro ao buscar artigo:", error);
      } finally {
        setLoading(false);
      }
    }

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  if (loading) return <p>Carregando artigo...</p>;

  if (!article || article.error) return <p>Artigo não encontrado.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-2">{article.date}</p>
      <p className="text-lg mb-6">{article.description}</p>
      <div className="prose">
        <p>{article.text}</p>
      </div>
    </div>
  );
}

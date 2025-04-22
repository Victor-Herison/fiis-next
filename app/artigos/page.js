'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/artigos/');
      const data = await res.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 ">Artigos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-500 mb-2">{article.description}</p>
            <p className="text-gray-700">
              {article.text.length > 200
                ? `${article.text.substring(0, 200)}...`
                : article.text}
            </p>
            <Link
              href={`/artigos/${article._id}`}
              className="inline-block mt-3 text-blue-600 hover:underline"
            >
              Ler artigo completo
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

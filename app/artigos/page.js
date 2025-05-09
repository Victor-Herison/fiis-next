"use client"
import { formatDate } from "@/utils/format"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Clock, ArrowRight, BookOpen, Loader2 } from "lucide-react"

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/artigos/")
        if (!res.ok) throw new Error("Falha ao carregar os artigos")
        const data = await res.json()
        setArticles(data)
      } catch (err) {
        setError("Não foi possível carregar os artigos. Tente novamente mais tarde.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Função para formatar a data (assumindo que createdAt existe no objeto)
 

  // Função para gerar uma cor de categoria baseada no nome da categoria
  const getCategoryColor = (category) => {
    if (!category) return "bg-blue-600"

    const colors = {
      investimentos: "bg-green-600",
      mercado: "bg-blue-600",
      economia: "bg-purple-600",
      finanças: "bg-yellow-600",
      educação: "bg-red-600",
    }

    return colors[category.toLowerCase()] || "bg-blue-600"
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Artigos e Análises</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conteúdo exclusivo sobre investimentos, mercado financeiro e economia para ajudar você a tomar melhores
              decisões.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-400 text-lg">Carregando artigos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400">Nenhum artigo encontrado</h3>
            <p className="text-gray-500 mt-2">Novos artigos serão publicados em breve.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article) => (
                <Link href={`/artigos/${article._id}`} key={article._id} className="group">
                  <div className="h-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-500 flex flex-col">
                    <div className="p-6 flex-grow">
                      {article.category && (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)} mb-4`}
                        >
                          {article.category}
                        </span>
                      )}
                      <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-gray-400 mb-4 line-clamp-2">{article.description}</p>
                      <p className="text-gray-500 line-clamp-3">{article.text}</p>
                    </div>

                    <div className="px-6 py-4 border-t border-gray-700 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDate(article.createdAt) || "Sem data"}</span>
                      </div>
                      <span className="text-blue-500 flex items-center font-medium group-hover:text-blue-400 transition-colors">
                        Ler artigo
                        <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

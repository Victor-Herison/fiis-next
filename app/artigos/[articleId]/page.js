"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Loader2, Share2, BookOpen } from "lucide-react"

export default function ArticlePage() {
  const { articleId } = useParams()
  const router = useRouter()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/artigos/${articleId}`)
        if (!res.ok) throw new Error("Falha ao carregar o artigo")
        const data = await res.json()
        setArticle(data)
      } catch (error) {
        console.error("Erro ao buscar artigo:", error)
        setError("Não foi possível carregar este artigo.")
      } finally {
        setLoading(false)
      }
    }

    if (articleId) {
      fetchArticle()
    }
  }, [articleId])

  // Função para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Função para formatar o texto com parágrafos
  const formatText = (text) => {
    if (!text) return []
    // Divide o texto em parágrafos
    return text.split("\n").filter((paragraph) => paragraph.trim() !== "")
  }

  // Função para gerar uma cor de categoria baseada no nome
  const getCategoryColor = (category) => {
    if (!category) return "bg-blue-600 text-white"

    const colors = {
      investimentos: "bg-green-600 text-white",
      mercado: "bg-blue-600 text-white",
      economia: "bg-purple-600 text-white",
      finanças: "bg-yellow-600 text-black",
      educação: "bg-red-600 text-white",
    }

    return colors[category.toLowerCase()] || "bg-blue-600 text-white"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-400 text-lg">Carregando artigo...</p>
      </div>
    )
  }

  if (error || !article || article.error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md mx-auto text-center">
          <BookOpen className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Artigo não encontrado</h2>
          <p className="text-gray-400 mb-6">{error || "Este artigo não está disponível ou foi removido."}</p>
          <Link
            href="/artigos"
            className="inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para artigos
          </Link>
        </div>
      </div>
    )
  }

  const paragraphs = formatText(article.text)

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      {/* Botão de voltar fixo no topo */}
      <div className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/artigos" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para artigos
          </Link>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: article.title,
                  text: article.description,
                  url: window.location.href,
                })
              } else {
                navigator.clipboard.writeText(window.location.href)
                alert("Link copiado para a área de transferência!")
              }
            }}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Hero do artigo */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 py-12 mb-8 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            {article.date && (
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(article.date)}</span>
              </div>
            )}

            {article.author && (
              <div className="flex items-center text-gray-300">
                <User className="h-4 w-4 mr-2" />
                <span>{article.author}</span>
              </div>
            )}

            {article.category && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-gray-300" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
              </div>
            )}
          </div>

          {article.description && (
            <p className="text-xl text-gray-300 border-l-4 border-blue-500 pl-4 italic">{article.description}</p>
          )}
        </div>
      </div>

      {/* Conteúdo do artigo */}
      <article className="max-w-3xl mx-auto px-4 prose prose-invert prose-lg prose-blue">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-6 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Seção de rodapé do artigo */}
      <div className="max-w-3xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/artigos"
            className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ver todos os artigos
          </Link>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: article.title,
                  text: article.description,
                  url: window.location.href,
                })
              } else {
                navigator.clipboard.writeText(window.location.href)
                alert("Link copiado para a área de transferência!")
              }
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar artigo
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Check, Loader2, Save, X, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminArticleForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    text: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [authToken, setAuthToken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [errors, setErrors] = useState({})

  // Categorias disponíveis
  const categories = ["Investimentos", "Mercado", "Economia", "Finanças", "Educação", "Análise", "Notícias", "Outros"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "O título é obrigatório"
    }

    if (!formData.description.trim()) {
      newErrors.description = "A descrição é obrigatória"
    }

    if (!formData.category) {
      newErrors.category = "Selecione uma categoria"
    }

    if (!formData.text.trim()) {
      newErrors.text = "O conteúdo do artigo é obrigatório"
    } else if (formData.text.trim().length < 100) {
      newErrors.text = "O conteúdo deve ter pelo menos 100 caracteres"
    }

    if (!formData.date) {
      newErrors.date = "A data é obrigatória"
    }

    if (!authToken.trim()) {
      newErrors.authToken = "O token de autorização é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setSubmitStatus({
        success: false,
        message: "Por favor, corrija os erros no formulário antes de enviar.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/artigos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erro ao publicar o artigo")
      }

      setSubmitStatus({
        success: true,
        message: "Artigo publicado com sucesso!",
        articleId: data._id || data.id,
      })

      // Limpa o formulário após sucesso
      setFormData({
        title: "",
        description: "",
        category: "",
        text: "",
        date: new Date().toISOString().split("T")[0],
      })
    } catch (error) {
      console.error("Erro ao enviar artigo:", error)
      setSubmitStatus({
        success: false,
        message: error.message || "Ocorreu um erro ao publicar o artigo. Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

  // Função para formatar o texto com parágrafos para o preview
  const formatText = (text) => {
    if (!text) return []
    return text.split("\n").filter((paragraph) => paragraph.trim() !== "")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 py-8 mb-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/artigos" className="text-gray-300 hover:text-white flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para artigos
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Publicar Novo Artigo</h1>
          <p className="text-gray-300 mt-2">Crie e publique um novo artigo para o seu blog</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Botão de alternância de visualização */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </>
            )}
          </button>
        </div>

        {/* Mensagem de status */}
        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-md ${
              submitStatus.success ? "bg-green-900/30 border border-green-700" : "bg-red-900/30 border border-red-700"
            }`}
          >
            <div className="flex items-start">
              {submitStatus.success ? (
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              )}
              <div>
                <p className={submitStatus.success ? "text-green-400" : "text-red-400"}>{submitStatus.message}</p>
                {submitStatus.success && submitStatus.articleId && (
                  <Link
                    href={`/artigos/${submitStatus.articleId}`}
                    className="text-blue-400 hover:underline mt-2 inline-block"
                  >
                    Ver artigo publicado
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {showPreview ? (
          /* Visualização do artigo */
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-2">Visualização do Artigo</h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-4">{formData.title || "Título do Artigo"}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(formData.date) || "Data não definida"}</span>
                </div>

                {formData.category && (
                  <div className="flex items-center">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                      {formData.category}
                    </span>
                  </div>
                )}
              </div>

              {formData.description && (
                <p className="text-xl text-gray-300 border-l-4 border-blue-500 pl-4 italic mb-8">
                  {formData.description}
                </p>
              )}

              <article className="prose prose-invert prose-lg max-w-none">
                {formatText(formData.text).map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
                {!formData.text && <p className="text-gray-500">O conteúdo do artigo aparecerá aqui...</p>}
              </article>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors"
              >
                Voltar para edição
              </button>
            </div>
          </div>
        ) : (
          /* Formulário de edição */
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-2">Detalhes do Artigo</h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Título */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Título*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.title ? "border-red-500" : "border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Digite o título do artigo"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Descrição */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Descrição*
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.description ? "border-red-500" : "border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Uma breve descrição do artigo"
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Categoria */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                  Categoria*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.category ? "border-red-500" : "border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-800 text-gray-300">
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>

              {/* Data */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                  Data de Publicação*
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.date ? "border-red-500" : "border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
              </div>

              {/* Conteúdo */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-1">
                  Conteúdo do Artigo*
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  rows="12"
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.text ? "border-red-500" : "border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Escreva o conteúdo do seu artigo aqui..."
                ></textarea>
                {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text}</p>}
                <p className="mt-1 text-sm text-gray-400">
                  Dica: Use linhas em branco para separar parágrafos. Texto atual: {formData.text.length} caracteres.
                </p>
              </div>

              {/* Token de Autorização */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="authToken" className="block text-sm font-medium text-gray-300 mb-1">
                  Token de Autorização*
                </label>
                <input
                  type="password"
                  id="authToken"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.authToken ? "border-red-500" : "border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Digite seu token de autorização"
                />
                {errors.authToken && <p className="mt-1 text-sm text-red-500">{errors.authToken}</p>}
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Publicando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Publicar Artigo
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

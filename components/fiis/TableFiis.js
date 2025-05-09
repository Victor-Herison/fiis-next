"use client"

import { DownloadTableExcel } from "react-export-table-to-excel"
import { useRef, useState } from "react"
import { FaRegSave } from "react-icons/fa"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
// Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
//component
import ErrorFilter from "@/components/fiis/ErrorFilter"
import ToolTipHook from "../ToolTipHook"

//utils
import { formatarMoeda, formatarNumero, formatDate } from "@/utils/format"

const fiiPerPage = 10

export default function TableFiis({ loading, fiis }) {
  const tableRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRow, setExpandedRow] = useState(null)
  const [currentFii, setCurrentFii] = useState([])

  // Calculate total pages
  const totalPages = Math.ceil(fiis.length / fiiPerPage)

  // Get current page fiis
  const indexOfLastFii = currentPage * fiiPerPage
  const indexOfFirstFii = indexOfLastFii - fiiPerPage
  const currentFiis = fiis.slice(indexOfFirstFii, indexOfLastFii)

  // Change page
  const goToPage = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)))
  }

  // Toggle expanded row for mobile view
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than max pages to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always show last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className="w-full bg-gray-800 overflow-x-auto">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Dialog>
        <table ref={tableRef} className="w-full">
          <thead className="bg-gray-700 rounded-t-3xl sticky top-0">
            <tr>
              <th
                colSpan="8"
                className={`h-13 rounded-t-3xl w-full p-1.5 ${
                  loading
                    ? "text-white bg-gray-500"
                    : fiis.length > 0 && fiis[0].error
                      ? "text-white bg-red-500"
                      : "text-white bg-green-500"
                }`}
              >
                {loading ? (
                  <p>Carregando...</p>
                ) : fiis.length > 0 && fiis[0].error ? (
                  <p className="text-xl text-center">Não há FIIs com esses filtros</p>
                ) : fiis.length > 0 ? (
                  <>
                    <p className="text-xl text-center">{fiis.length} FIIs encontrados</p>
                    <DownloadTableExcel filename="FIIs_filtrados" sheet="dados" currentTableRef={tableRef.current}>
                      <button className="inline cursor-pointer hover:text-green-900 transition-all duration-300">
                        Exportar <FaRegSave className="inline" />
                      </button>
                    </DownloadTableExcel>
                  </>
                ) : (
                  <p className="text-center w-full">Nenhum FII encontrado</p>
                )}
              </th>
            </tr>
            <tr className="h-15 text-center text-lg text-white">
              <th className=" text-base  px-2">Papel <ToolTipHook content={'Ticker do fundo, caso você queira pesquisar sobre o fundo basta copiar esse ticker e colar no seu motor de buscar predileto.'}/></th>
              <th className=" text-base">Cotação <ToolTipHook content={'Valor de uma cota do fundo'}/></th>
              <th className=" text-base px-2">DY <ToolTipHook content={'Quanto de dividendo o fundo ta pagando em comparação com o valor de uma cota.'}/></th>
              <th className=" text-base px-2">P/VP <ToolTipHook content={'Preço da cota sobre o valor patrimonial.'} className="mt-"/></th>
              <th className=" text-base px-2">Liquidez <ToolTipHook content={'Fluxo de venda e compra do fundo por dia.'}/></th>
              <th className=" text-base px-2">FFO Yield <ToolTipHook content={'Lucro operacional em relação ao preço da cota. Indica o retorno "real" gerado pelo fundo.'}/></th>
              <th className=" text-base px-2">Valor de Mercado</th>
              <th className=" text-base px-2">Segmento</th>
            </tr>
          </thead>
          {fiis.length > 0 && fiis[0].error ? (
            <ErrorFilter />
          ) : (
            <tbody className="bg-black">
              {currentFiis.map((fii) => (
                <DialogTrigger asChild key={fii.papel}>
                <tr
                  key={fii.papel}
                  className="font-medium cursor-pointer text-center text-lg text-white bg-gray-800 border-b-1 border-gray-700 hover:bg-gray-900 transition-all duration-300"
                  onClick={() => {
                    setCurrentFii(fii)
                  }}
                >
                  <td className="py-2 px-2 font-bold border-r-1 border-gray-700 text-green-400">{fii.papel}</td>
                  <td className="py-2 px-2 border-r-1 border-gray-700 font-['Inter']">{formatarMoeda(fii.cotacao)}</td>
                  <td
                    className={`py-2 px-2 border-r-1 border-gray-700 font-['Inter'] ${
                      fii.DY >= 8 && fii.DY <= 13 ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {formatarNumero(fii.DY)}%
                  </td>
                  <td
                    className={`py-2 px-2 border-r-1 border-gray-700 font-['Inter'] ${
                      fii.PVP >= 0.8 && fii.PVP <= 1.1 ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {formatarNumero(fii.PVP)}
                  </td>
                  <td className="py-2 px-2 border-r-1 border-gray-700 font-['Open Sans-Serif']">{formatarMoeda(fii.liquidez)}</td>
                  <td className="py-2 px-2 border-r-1 border-gray-700 font-['Inter']">{formatarNumero(fii.FFOYield)}%</td>
                  <td className="py-2 px-2 border-r-1 border-gray-700 font-['Inter']">
                    {formatarMoeda(fii.valorMercado)}
                  </td>
                  <td
                    className={`py-2 px-2 font-bold ${
                      fii.segmento === "Logisticos"
                        ? "text-emerald-300"
                        : fii.segmento === "Shopping/Varejo"
                          ? "text-blue-300"
                          : fii.segmento === "Titulos e Val. Mob."
                            ? "text-amber-600"
                            : fii.segmento === "Híbrido"
                              ? "text-purple-300"
                              : fii.segmento === "Lajes Corporativas"
                              ? "text-pink-300"
                              : fii.segmento === "Recebíveis Imobiliários"
                                ? "text-cyan-300"
                                : fii.segmento === "Agencias Bancárias"
                                ? "text-orange-300"
                                : fii.segmento === "FIAGRO"
                                ? "text-lime-300"
                                : fii.segmento === "Fundo de Fundos"
                                ? "text-teal-300"
                                : fii.segmento === "Lajes Comerciais"
                                ? "text-rose-300"
                                
                                : "text-yellow-200"
                    }`}
                  >
                    {fii.segmento}
                  </td>
                </tr>
                </DialogTrigger>
              ))}
            </tbody>
          )}
          </table>
          {/* Dialog Content */}
          <DialogContent>
            
              <DialogHeader>
          <DialogTitle>{currentFii.papel}</DialogTitle>
          <DialogDescription>
            A seguir, dados relacionados ao {currentFii.papel}.
          </DialogDescription>
        </DialogHeader>
         <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Dividend Yield:</span>
                <span>{formatarNumero(currentFii.DY)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">P/VP:</span>
                <span>{formatarNumero(currentFii.PVP)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">FFO Yield:</span>
                <span>{formatarNumero(currentFii.FFOYield)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cotação:</span>
                <span>{formatarMoeda(currentFii.cotacao)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Vacância Média:</span>
                <span>{formatarNumero(currentFii.vacanciaMedia)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Segmento:</span>
                <span>{currentFii.segmento}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Nome:</span>
                <span>{currentFii.nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Administração:</span>
                <span>{currentFii.adm}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Última atualização:</span>
                <span>{formatDate(currentFii.updatedAt)}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
          
      {/* Mobile Table */}
      <div className="md:hidden">
        <div
          className={`w-full p-3 ${
            loading ? "bg-gray-500" : fiis.length > 0 && fiis[0].error ? "bg-red-500" : "bg-green-500"
          } text-white rounded-t-lg`}
        >
          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : fiis.length > 0 && fiis[0].error ? (
            <p className="text-center">Não há FIIs com esses filtros</p>
          ) : fiis.length > 0 ? (
            <div className="flex justify-between items-center">
              <p>{fiis.length} FIIs encontrados</p>
              <DownloadTableExcel filename="FIIs_filtrados" sheet="dados" currentTableRef={tableRef.current}>
                <button className="flex items-center gap-1 hover:text-green-900 transition-all duration-300">
                  <FaRegSave /> Exportar
                </button>
              </DownloadTableExcel>
            </div>
          ) : (
            <p className="text-center">Nenhum FII encontrado</p>
          )}
        </div>

        {fiis.length > 0 && !fiis[0].error && (
          <div className="space-y-3 mt-2">
            {currentFiis.map((fii, index) => (
              <div key={fii.papel} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-3 cursor-pointer" onClick={() => toggleRow(index)}>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-medium">{fii.papel}</span>
                    <span className="text-white">{formatarMoeda(fii.cotacao)}</span>
                  </div>
                  <ChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${
                      expandedRow === index ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                {expandedRow === index && (
                  <div className="px-3 pb-3 pt-1 border-t border-gray-700">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="py-1 text-gray-400">DY:</td>
                          <td
                            className={`py-1 text-right ${
                              fii.DY >= 8 && fii.DY <= 13 ? "text-green-400" : "text-yellow-400"
                            }`}
                          >
                            {formatarNumero(fii.DY)}%
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">P/VP:</td>
                          <td
                            className={`py-1 text-right ${
                              fii.PVP >= 0.8 && fii.PVP <= 1.1 ? "text-green-400" : "text-yellow-400"
                            }`}
                          >
                            {formatarNumero(fii.PVP)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">Liquidez:</td>
                          <td className="py-1 text-right text-white">{formatarMoeda(fii.liquidez)}</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">Imóveis:</td>
                          <td className="py-1 text-right text-white">{fii.qtdImoveis}</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">Vacância média:</td>
                          <td className="py-1 text-right text-white">{formatarNumero(fii.vacanciaMedia)}%</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">FFO Yield:</td>
                          <td className="py-1 text-right text-white">{formatarNumero(fii.FFOYield)}%</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">Administrador:</td>
                          <td className="py-1 text-right text-white">{fii.adm}</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">Nome:</td>
                          <td className="py-1 text-right text-white">{fii.nome}</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">Segmento:</td>
                          <td
                            className={`py-1 text-right ${
                              fii.segmento === "Logisticos"
                              ? "text-emerald-300"
                              : fii.segmento === "Shopping/Varejo"
                                ? "text-blue-300"
                                : fii.segmento === "Titulos e Val. Mob."
                                  ? "text-amber-600"
                                  : fii.segmento === "Híbrido"
                                    ? "text-purple-300"
                                    : fii.segmento === "Lajes Corporativas"
                                    ? "text-pink-300"
                                    : fii.segmento === "Recebíveis Imobiliários"
                                      ? "text-cyan-300"
                                      : fii.segmento === "Agencias Bancárias"
                                      ? "text-orange-300"
                                      : fii.segmento === "FIAGRO"
                                      ? "text-lime-300"
                                      : fii.segmento === "Fundo de Fundos"
                                      ? "text-teal-300"
                                      : fii.segmento === "Lajes Comerciais"
                                      ? "text-rose-300"
                                      
                                      : "text-yellow-200"
                            }`}
                          >
                            {fii.segmento}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-400">Saiba mais:</td>
                          <td className="py-1 text-right underline text-amber-100"><a href={`https://investidor10.com.br/fiis/${fii.papel}`}>Investidor10</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls - Same for both views */}
      {fiis.length > 0 && !fiis[0].error && totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 mb-6 w-full">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-green-400 hover:bg-gray-900"
              }`}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {getPageNumbers().map((pageNumber, index) => (
              <button
                key={index}
                onClick={() => (typeof pageNumber === "number" ? goToPage(pageNumber) : null)}
                className={`px-3 py-1 rounded-md ${
                  pageNumber === currentPage
                    ? "bg-green-400 text-white"
                    : pageNumber === "..."
                      ? "cursor-default"
                      : "hover:bg-gray-900 text-green-400"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-green-400 hover:bg-gray-900"
              }`}
              aria-label="Próxima página"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Page info */}
      {fiis.length > 0 && !fiis[0].error && totalPages > 1 && (
        <div className="text-center text-sm text-gray-500 bg-green-400">
          Mostrando {indexOfFirstFii + 1}-{Math.min(indexOfLastFii, fiis.length)} de {fiis.length} FIIs
        </div>
      )}
    </div>
  )
}

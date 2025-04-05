"use client"
//baixar como excel
import { DownloadTableExcel } from "react-export-table-to-excel"

// useRef para exportar como excel
import { useRef, useState } from "react"

//icons
import { FaRegSave } from "react-icons/fa"
import { ChevronLeft, ChevronRight } from "lucide-react"

//componente de erro
import ErrorFilter from "@/components/ErrorFilter"
//formatar moeda
import { formatarMoeda, formatarNumero } from "@/utils/format"

const fiiPerPage = 10
export default function TableFiis({ loading, fiis }) {
  const tableRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  

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
    <div className="w-full">
      <table ref={tableRef} className="w-full">
        <thead className="bg-gray-500 rounded-t-3xl sticky top-0">
          <tr>
            <th
              colSpan="8"
              className={`h-13 rounded-t-3xl w-full p-1.5 ${loading ? "text-white bg-gray-500" : fiis.length > 0 && fiis[0].error ? "text-white bg-red-500" : "text-white bg-green-500"}`}
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
            <th className="w-[12%]">Papel</th>
            <th className="w-[12%]">Cotação</th>
            <th className="w-[12%]">DY</th>
            <th className="w-[12%]">P/VP</th>
            <th className="w-[12%]">Liquidez</th>
            <th className="w-[12%]">Imóveis</th>
            <th className="w-[12%]">Vacância média</th>
            <th className="w-[14%]">Segmento</th>
          </tr>
        </thead>
        {fiis.length > 0 && fiis[0].error ? (
          <ErrorFilter />
        ) : (
            
          <tbody className="bg-black">
            
            {currentFiis.map((fii) => (
                
              <tr
                key={fii.papel}
                className="text-center text-lg text-black bg-white border-b-1 border-gray-200 hover:bg-gray-100 transition-all duration-300"
              >
                <td className="py-2 font-medium border-r-1 border-gray-200">{fii.papel}</td>
                <td className="py-2 border-r-1 border-gray-200 font-['Inter']">{formatarMoeda(fii.cotacao)}</td>
                <td
                  className={`py-2 border-r-1 border-gray-200 font-['Inter'] ${fii.DY >= 8 && fii.DY <= 13 ? "text-green-500" : "text-yellow-500"}`}
                >
                  {fii.DY}%
                </td>
                <td
                  className={`py-2 border-r-1 border-gray-200 font-['Inter'] ${fii.PVP >= 0.8 && fii.PVP <= 1.1 ? "text-green-500" : "text-yellow-500"}`}
                >
                  {fii.PVP}
                </td>
                <td className="py-2 border-r-1 border-gray-200 font-['Inter']">{formatarMoeda(fii.liquidez)}</td>
                <td className="py-2 border-r-1 border-gray-200 font-['Inter']">{fii.qtdImoveis}</td>
                <td className="py-2 border-r-1 border-gray-200 font-['Inter']">{formatarNumero(fii.vacanciaMedia)}%</td>
                <td
                  className={`py-2 ${
                    fii.segmento === "Logistica"
                      ? "text-[#10B981]"
                      : fii.segmento === "Shoppings"
                        ? "text-[#3B82F6]"
                        : fii.segmento === "Titulos e Val. Mob."
                          ? "text-[#F59E0B]"
                          : fii.segmento === "Hibrido"
                            ? "text-[#8B5CF6]"
                            : fii.segmento === "Lajes Corporativas"
                              ? "text-[#EF4444]"
                              : "text-black"
                  }`}
                >
                  {fii.segmento}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {/* Pagination Controls */}
      {fiis.length > 0 && !fiis[0].error && totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-green-500 hover:bg-green-50"}`}
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
                    ? "bg-green-500 text-white"
                    : pageNumber === "..."
                      ? "cursor-default"
                      : "hover:bg-green-50 text-green-600"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-green-500 hover:bg-green-50"}`}
              aria-label="Próxima página"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Page info */}
      {fiis.length > 0 && !fiis[0].error && totalPages > 1 && (
        <div className="text-center text-sm text-gray-500 mb-4">
          Mostrando {indexOfFirstFii + 1}-{Math.min(indexOfLastFii, fiis.length)} de {fiis.length} FIIs
          
        </div>

      )}
      
    </div>
  )
}


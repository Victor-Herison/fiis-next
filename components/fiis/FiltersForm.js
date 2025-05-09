"use client"

import { useState } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { options } from "@/utils/opitions"
import { Search, Filter } from "lucide-react"

export default function FiltersForm({ filters, setFilters, handleSubmit, loading, search, setSearch }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="w-full max-w-full mx-auto px-4 py-6">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="sm:hidden flex items-center justify-center gap-2 w-full bg-white rounded-lg shadow-md p-3 mb-4 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:text-white transition-all duration-300"
      >
        <Filter size={18} className="text-gray-600 hover:text-white transition-all duration-300" />
        <span className="font-medium">{isExpanded ? "Ocultar filtros" : "Mostrar filtros"}</span>
      </button>

      <form
        className={`${
          isExpanded ? "flex" : "hidden sm:flex"
        } flex-col sm:flex-row filter-form lg:flex gap-3 md:gap-4 2xl:justify-evenly items-stretch transition-all duration-300`}
        onSubmit={handleSubmit}
      >
        {/* DY */}
        <div className="bg-white justify-between rounded-lg shadow-md flex items-center px-3 py-2 hover:shadow-lg hover:bg-green-50 transition-all duration-300">
          <div>
            <label
              htmlFor="dy"
              className="text-gray-700 font-medium whitespace-nowrap mr-2 cursor-pointer"
            >
              DY Mínimo:
            </label>
            <input
              type="number"
              id="dy"
              placeholder="0"
              value={filters.dy || ""}
              onChange={(e) => setFilters({ ...filters, dy: e.target.value })}
              className={`w-30 sm:w-24 md:w-22 xl:w-14 focus:outline-none focus:ring-1 focus:ring-green-500 rounded px-2 py-1 ${
                filters.dy >= 8 && filters.dy <= 13 ? "text-green-600" : "text-amber-600"
              }`}
            />
          </div>
          <span className="ml-1 text-gray-700">%</span>
        </div>

        {/* PVP */}
        <div className="bg-white rounded-lg shadow-md flex items-center px-3 py-2 hover:shadow-lg hover:bg-green-50 transition-all duration-300">
          <label
            htmlFor="pvp"
            className="text-gray-700 font-medium whitespace-nowrap mr-2 cursor-pointer"
          >
            P/VP Máximo:
          </label>
          <input
            type="number"
            id="pvp"
            placeholder="0"
            value={filters.pvp || ""}
            onChange={(e) => setFilters({ ...filters, pvp: e.target.value })}
            className={`w-30 sm:w-24 md:w-22 xl:w-14 focus:outline-none focus:ring-1 focus:ring-green-500 rounded px-2 py-1 ${
              filters.pvp >= 0.8 && filters.pvp <= 1.1 ? "text-green-600" : "text-amber-600"
            }`}
          />
        </div>

        {/* SEGMENTO */}
        <div className="bg-white rounded-lg shadow-md flex items-center px-3 py-2 hover:shadow-lg hover:bg-green-50 transition-all duration-300">
          <label
            htmlFor="segmento"
            className="text-gray-700 font-medium whitespace-nowrap mr-2 cursor-pointer"
          >
            Segmento:
          </label>
          <select
            id="segmento"
            value={filters.segmento}
            onChange={(e) => setFilters({ ...filters, segmento: e.target.value })}
            className={`focus:outline-none cursor-pointer focus:ring-1 focus:ring-green-500 rounded px-2 py-1 ${
              filters.segmento === "Logisticos"
                ? "text-emerald-600"
                : filters.segmento === "Shopping/Varejo"
                ? "text-blue-600"
                : filters.segmento === "Recebiveis Imobiliarios"
                ? "text-amber-600"
                : filters.segmento === "Híbrido"
                ? "text-purple-600"
                : filters.segmento === "Lajes Corporativas"
                ? "text-pink-600"
                : filters.segmento === "Outros"
                ? "text-blue-600"
                : filters.segmento === "Recebíveis Imobiliários"
                ? "text-cyan-600"
                : filters.segmento === "Agencias Bancárias"
                ? "text-orange-600"
                : filters.segmento === "FIAGRO"
                ? "text-lime-600"
                : filters.segmento === "Lajes Comerciais"
                ? "text-rose-700"
                : filters.segmento === "Fundo de Fundos"
                ? "text-teal-600"
                : filters.segmento === "Titulos e Val. Mob."
                ? "text-amber-600"
                : "text-gray-700"
            }`}
          >
            <option value="">Todos segmentos</option>
            <option value="Shopping/Varejo" className="text-blue-600">
            Shopping/Varejo
            </option>
            <option value="Logisticos" className="text-emerald-600">
            Logisticos
            </option>
            <option value="Titulos e Val. Mob." className="text-amber-600">
              Títulos e Val. Mob.
            </option>
            <option value="Recebíveis Imobiliários" className="text-cyan-600">
            Recebíveis Imobiliários
            </option>
            <option value="Híbrido" className="text-purple-700">
              Híbrido
            </option>
            <option value="Lajes Corporativas" className="text-pink-600">
              Lajes Corporativas
            </option>
            <option value="Agencias Bancárias" className="text-orange-600">
            Agencias Bancárias
            </option>
            <option value="FIAGRO" className="text-lime-600">
            FIAGRO
            </option>
            <option value="Fundo de Fundos" className="text-teal-600">
            Fundo de Fundos
            </option>
            <option value="Lajes Comerciais" className="text-rose-700">
            Lajes Comerciais
            </option>
            
            <option value="Outros" className="text-gray-700">
              Outros
            </option>
          </select>
        </div>

        {/* Liquidez */}
        <div className="bg-white rounded-lg shadow-md flex items-center px-3 py-2 hover:shadow-lg hover:bg-green-50 transition-all duration-300">
          <label
            htmlFor="liquidez"
            className="text-gray-700 font-medium whitespace-nowrap mr-2 cursor-pointer"
          >
            Liquidez:
          </label>
          <div className="flex items-center">
            <span className="text-gray-700 mr-1">R$</span>
            <input
              type="number"
              id="liquidez"
              placeholder="1.500.000"
              value={filters.liquidez || ""}
              onChange={(e) => setFilters({ ...filters, liquidez: e.target.value })}
              className={`w-24 sm:w-32 md:w-40 focus:outline-none focus:ring-1 focus:ring-green-500 rounded px-2 py-1 ${
                filters.liquidez >= 1500000 && filters.liquidez ? "text-green-600" : "text-amber-600"
              }`}
            />
          </div>
        </div>

        {/* Autocomplete */}
        <div className="bg-white rounded-lg shadow-md flex items-center px-3 py-2 hover:shadow-lg hover:bg-green-50 transition-all duration-300">
          <div className="flex items-center w-full">
            <Search size={18} className="text-gray-500 mr-2" />
            <Autocomplete
              onInputChange={(event, value) => setSearch(value)}
              disablePortal
              options={options}
              sx={{
                width: "100%",
                minWidth: "150px",
                "& .MuiInput-underline:before": { borderBottom: "none" },
                "& .MuiInput-underline:after": { borderBottom: "2px solid #10B981" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" placeholder="Buscar" className="placeholder:text-gray-400" />
              )}
            />
          </div>
        </div>

        {/* Botão para buscar */}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-md curso disabled:opacity-70 transition-all flex items-center justify-center hover:scale-105 hover:shadow-lg gap-2 min-w-[120px] duration-300 cursor-pointer"
        >
          <Filter size={18} />
          {loading ? "Carregando..." : "Filtrar"}
        </button>
      </form>
    </div>
  )
}

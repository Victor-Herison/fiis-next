"use client";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaRegSave } from "react-icons/fa";


import { useState, useEffect, useRef } from "react";
import "./globals.css";
import {options} from "@/utils/opitions";
import Aviso from "@/components/aviso";
import ErrorFilter from "@/components/ErrorFilter";
import { FIIsDropdown } from "@/components/FIIsDropdown";
import { formatarMoeda, formatarNumero } from "@/utils/format";



export default function Home() {
    const [fiis, setFiis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        dy: 12,
        pvp: 1,
        segmento:"",
        pl: 0,
        vacancia: 0,
        qtdImoveis: 0,
    });

    const tableRef = useRef(null);
    console.log(search)
    
    useEffect(() => {
        fetchFiis();
    }, []);

    const handleSubmit = async(e) =>{
        e.preventDefault()

        await fetchFiis()
    }

    async function fetchFiis() {

        let url = search.length > 5
            ? `/api/fii/${search.toUpperCase()}`
            : `/api/fii?dy=${filters.dy}&pvp=${filters.pvp}&segmento=${filters.segmento}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            setFiis(Array.isArray(data) ? data : [data]); // Garante que sempre seja um array
        } catch (error) {
            console.error("Erro ao buscar FIIs", error);
            setFiis([]);
        } finally {
            setLoading(false);
            setSearch("")
            
        }
    }

    return (
        <div className="xl:mx-10 mx-5 my-10">

            <Aviso />
            
            
            
            <div className="bg-[#33445B] p-1 rounded-md shadow min-w-[1202px] mt-10">
                <form className="flex flex-row justify-evenly items-center  gap-4 py-2 filter" onSubmit={handleSubmit}>

                {/* cotação minima */}
                {/* <div className="bg-white p-1.5 rounded-md flex flex-row items-center gap-2 shadow h-9">
                        <label htmlFor="dy" className="text-md font-semibold cursor-pointer">DY: </label>
                        <input
                        type="number"
                        id="dy"
                        placeholder="DY mínimo"
                        value={filters.dy || ""}
                        onChange={(e) => setFilters({ ...filters, dy: e.target.value })}
                        className={`w-5 cursor-pointer focus:outline-none ${filters.dy >= 8 && filters.dy <= 13 ? "text-green-500" : "text-yellow-500"}`}
                    />%
                    </div> */}
                    {/* DY */}
                    <div className="bg-white p-1.5 rounded-md flex flex-row items-center gap-2 shadow h-9">
                        <label htmlFor="dy" className="text-md leading-none font-semibold text-center cursor-pointer min-w-22">DY Mínimo: </label>
                        <input
                        type="number"
                        id="dy"
                        placeholder="DY"
                        value={filters.dy || ""}
                        onChange={(e) => setFilters({ ...filters, dy: e.target.value })}
                        className={`w-6 cursor-pointer focus:outline-none ${filters.dy >= 8 && filters.dy <= 13 ? "text-green-500" : "text-yellow-500"}`}
                    />%
                    </div>

                    {/* PVP */}
                    <div className="bg-white p-1.5 rounded-md flex flex-row items-center gap-2 shadow h-9">
                        <label htmlFor="pvp" className="text-md leading-none font-semibold text-center cursor-pointer min-w-25">PVP Máximo: </label>
                        <input
                        type="number"
                        id="pvp"
                        placeholder="P/VP"
                        value={filters.pvp || ""}
                        onChange={(e) => setFilters({ ...filters, pvp: e.target.value })}
                        className={`w-5 cursor-pointer focus:outline-none ${filters.pvp >= 0.8 && filters.pvp <= 1.1 ? "text-green-500" : "text-yellow-500"}`}
                    />
                    </div>
                    {/* SEGMENTO */}
                    <div className="bg-white p-1.5 rounded-md flex flex-row items-center gap-2 shadow h-9">
                    <select
                        value={filters.segmento}
                        onChange={(e) => setFilters({ ...filters, segmento: e.target.value })}
                        className={`cursor-pointer focus:outline-none ${filters.segmento === "Logistica" ? "text-[#10B981]" :
                            filters.segmento === "Shoppings" ? "text-[#3B82F6]" :
                            filters.segmento === "Titulos e Val. Mob." ? "text-[#F59E0B]" :
                            filters.segmento === "Hibrido" ? "text-[#8B5CF6]" :
                            filters.segmento === "Lajes Corporativas" ? "text-[#EF4444]" :
                            filters.segmento === "Outros" ? "text-[#3B82F6]" :
                            "text-black"}`}
                        >
                        <option value="">Todos segmentos</option>
                        <option value="Shoppings" className='text-[#3B82F6]'>Shoppings</option>
                        <option value="Logistica" className='text-[#10B981]'>Logística</option>
                        <option value="Titulos e Val. Mob." className='text-[#F59E0B]'>Títulos e Val. Mob</option>
                        <option value="Hibrido" className='text-[#8B5CF6]'>Híbrido</option>
                        <option value="Lajes Corporativas" className='text-[#EF4444]'>Lajes Corporativas</option>
                        <option value="Outros" className='text-gray-700'>Outros</option>
                        </select>
                    </div>


                    {/* PL */}
                    <div className="bg-white p-1.5 rounded-md flex flex-row items-center gap-2 shadow h-9">
                        <label htmlFor="pl" className="text-md leading-none font-semibold text-center cursor-pointer">Patrimônio: </label>
                        <input
                        type="number"
                        id="pl"
                        placeholder="150.000"
                        value={filters.pl || ""}
                        onChange={(e) => setFilters({ ...filters, pl: e.target.value })}
                        className={`w-17 cursor-pointer focus:outline-none ${filters.pl >= 1500000 && filters.pl ? "text-green-500" : "text-yellow-500"}`}
                        />R$
                    </div>

                    {/* Vacancia */}
                    <div className="bg-white p-1.5 rounded-md flex flex-row items-center gap-2 shadow h-9">
                        <label htmlFor="vacancia" className="text-md font-semibold cursor-pointer">Vacância: </label>
                        <input
                        type="number"
                        id="vacancia"
                        placeholder="ex: 3"
                        value={filters.vacancia || ""}
                        onChange={(e) => setFilters({ ...filters, vacancia: e.target.value })}
                        className={`w-8 cursor-pointer focus:outline-none ${filters.vacancia >= 0 && filters.vacancia <= 8 ? "text-green-500" : "text-yellow-500"}`}
                        />%
                    </div>

                    {/* Qtd imoveis */}
                    <div className="bg-white p-1.5 rounded-md flex flex-row items-center gap-2 shadow h-9">
                        <label htmlFor="qtdImoveis" className="text-md font-semibold cursor-pointer">imóveis: </label>
                        <input
                        type="number"
                        id="qtdImoveis"
                        placeholder="3"
                        value={filters.qtdImoveis || ""}
                        onChange={(e) => setFilters({ ...filters, qtdImoveis: e.target.value })}
                        className={`w-6 cursor-pointer focus:outline-none ${filters.qtdImoveis >= 8 ? "text-green-500" : "text-yellow-500"}`}
                        />
                    </div>


                    {/* Autocomplete */}
               
                    <Autocomplete
                        onInputChange={(event, value) => setSearch(value)}
                        disablePortal
                        options={options}
                        sx={{ width: 200}}
                        renderInput={(params) => <TextField {...params} variant="standard" placeholder="Buscar" className="placeholder:text-gray-400 text-center" />}
                        className="bg-white rounded-md flex flex-row items-center gap-2 border-none p-4 h-9 "
                    />
                    
                    {/* Botão para buscar */}
                    <button type='submit' disabled={loading} className="bg-green-500/20 text-green-400 font-bold px-4 py-2 rounded-md border-1-green w-40 cursor-pointer hover:bg-green-500/40 transition-all duration-300">
                        {loading ? "Carregando..." : "Filtrar"}
                    </button>
                </form>
            </div>
                
            
            {/* Input para busca por nome */}
            {/* <input
                type="text"
                placeholder="Buscar por nome (ex: MXRF11)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            /> */}

            {/* Inputs para filtros */}
           
            
           
            {/* Lista de FIIs */}
            <div className="w-full bg-white rounded-3xl shadow min-h-150  mt-7 overflow-auto">
                <table className="w-full" ref={tableRef}>
                    <thead className="bg-gray-500 rounded-t-3xl sticky top-0">
                        <tr>
                            <th colSpan="8" className={`h-13 rounded-t-3xl w-full p-1.5 ${loading ? "text-white bg-gray-500" : fiis.length > 0 && fiis[0].error ? "text-white bg-red-500" : "text-white bg-green-500"}`}>
                                {loading ? (<p>Carregando...</p>) : fiis.length > 0 && fiis[0].error ? 
                                (<p className="text-xl text-center">Não há FIIs com esses filtros</p>) : fiis.length > 0 ? 
                                (<><p className="text-xl text-center">{fiis.length} FIIs encontrados</p>
                                    <DownloadTableExcel
                                    filename="FIIs_filtrados"
                                    sheet="dados"
                                    currentTableRef={tableRef.current}
                                    >
                                        <button className="inline cursor-pointer hover:text-green-900 transition-all duration-300">Exportar <FaRegSave className="inline"/></button>
                                    </DownloadTableExcel>
                                </>) : (<p className="text-center w-full">Nenhum FII encontrado</p>)}
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
                    {fiis.length > 0 && fiis[0].error ? (<ErrorFilter />) : (
                    <tbody className="bg-black">
                        {fiis.map((fii) => (
                            <tr key={fii.papel} className="text-center text-lg text-black bg-white border-b-1 border-gray-200 hover:bg-gray-100 transition-all duration-300">
                                <td className="py-2 font-medium border-r-1 border-gray-200">{fii.papel}</td>
                                <td className="py-2 border-r-1 border-gray-200 font-['Inter']">{formatarMoeda(fii.cotacao)}</td>
                                <td className={`py-2 border-r-1 border-gray-200 font-['Inter'] ${fii.DY >= 8 && fii.DY <= 13 ? "text-green-500" : "text-yellow-500"}`}>{fii.DY}%</td>
                                <td className={`py-2 border-r-1 border-gray-200 font-['Inter'] ${fii.PVP >= 0.8 && fii.PVP <= 1.1 ? "text-green-500" : "text-yellow-500"}`}>{fii.PVP}</td>                  
                                <td className="py-2 border-r-1 border-gray-200 font-['Inter']">{formatarMoeda(fii.liquidez)}</td>                          
                                <td className="py-2 border-r-1 border-gray-200 font-['Inter']">{fii.qtdImoveis}</td>
                                <td className="py-2 border-r-1 border-gray-200 font-['Inter']">{formatarNumero(fii.vacanciaMedia)}%</td>
                                <td className={`py-2 ${fii.segmento === "Logistica" ? "text-[#10B981]" :
                                    fii.segmento === "Shoppings" ? "text-[#3B82F6]" :
                                    fii.segmento === "Titulos e Val. Mob." ? "text-[#F59E0B]" :
                                    fii.segmento === "Hibrido" ? "text-[#8B5CF6]" :
                                    fii.segmento === "Lajes Corporativas" ? "text-[#EF4444]" :
                                    "text-black"}`}>{fii.segmento}</td>
                            </tr>
                        ))}
                       
                    </tbody>)}
                    </table>
            
                
            </div>
            <FIIsDropdown />
        </div>
    );
}

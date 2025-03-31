"use client";
//baixar como excel
import { DownloadTableExcel } from 'react-export-table-to-excel';
//icons
import { FaRegSave } from "react-icons/fa";


import { useState, useEffect, useRef } from "react";
//components, UI, utils
import Aviso from "@/components/Aviso";
import ErrorFilter from "@/components/ErrorFilter";
import { FIIsDropdown } from "@/components/FIIsDropdown";
import { formatarMoeda, formatarNumero } from "@/utils/format";
import FiltersForm from "@/components/FiltersForm";


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
                <FiltersForm filters={filters} setFilters={setFilters} handleSubmit={handleSubmit} loading={loading} search={search} setSearch={setSearch} />
            </div>

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
            {/* explicação do filtro */}
            <FIIsDropdown />
        </div>
    );
}

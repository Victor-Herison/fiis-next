"use client";


import { useState, useEffect, useRef } from "react";
//components, UI, utils
import Aviso from "@/components/Aviso";
import { FIIsDropdown } from "@/components/fiis/FIIsDropdown";

import FiltersForm from "@/components/fiis/FiltersForm";
import TableFiis from '@/components/fiis/TableFiis';


export default function Home() {
    const [fiis, setFiis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        dy: 12,
        pvp: 1,
        segmento:"",
        liquidez: 1500000,
    });

    
    
    useEffect(() => {
        fetchFiis();
    }, []);

    const handleSubmit = async(e) =>{
        setLoading(true)
        e.preventDefault()

        await fetchFiis()
        setLoading(false)
    }

    async function fetchFiis() {

        let url = search.length > 5
            ? `/api/fii/${search.toUpperCase()}`
            : `/api/fii?dy=${filters.dy}&pvp=${filters.pvp}&segmento=${filters.segmento}&liquidez=${filters.liquidez}`;
        

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
            
            
            
            <div className="bg-[#33445B] p-1 rounded-md mt-10 w-full">
                <FiltersForm filters={filters} setFilters={setFilters} handleSubmit={handleSubmit} loading={loading} search={search} setSearch={setSearch} />
            </div>

            {/* Inputs para filtros */}
           
            
           
            {/* Lista de FIIs */}
            <div className="w-full bg-white rounded-3xl shadow min-h-150  mt-7 overflow-auto">
                <TableFiis  loading={loading} fiis={fiis}/>
            
            </div>
            {/* explicação do filtro */}
            <FIIsDropdown />
        </div>
    );
}

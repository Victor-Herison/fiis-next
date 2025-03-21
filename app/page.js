"use client";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useState, useEffect } from "react";
import css from "./globals.css";
import {options} from "@/utils/opitions";
import Aviso from "@/components/aviso";



export default function Home() {
    const [fiis, setFiis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        dy: 12,
        pvp: 1,
        segmento: "",
    });
    console.log(search)
    
    useEffect(() => {
        fetchFiis();
    }, []);

    async function fetchFiis() {
        setLoading(true);
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
        <div className="mx-23 my-10">
            <Aviso />
            <form>
                {/* DY */}
                <input
                    type="number"
                    placeholder="DY mínimo"
                    value={filters.dy}
                    onChange={(e) => setFilters({ ...filters, dy: e.target.value })}
                />

                {/* PVP */}
                <input
                    type="number"
                    placeholder="PVP máximo"
                    value={filters.pvp}
                    onChange={(e) => setFilters({ ...filters, pvp: e.target.value })}
                />
                {/* SEGMENTO */}
                 <select
                    value={filters.segmento}
                    onChange={(e) => setFilters({ ...filters, segmento: e.target.value })}
                    >
                    <option value="">Todos segmentos</option>
                    <option value="Shoppings">Shoppings</option>
                    <option value="Logistica">Logística</option>
                    <option value="Titulos e Val. Mob">Títulos e Val. Mob</option>
                    <option value="Hibrido">Híbrido</option>
                    <option value="Lajes Corporativas">Lajes Corporativas</option>
                    <option value="Outros">Outros</option>
                    </select>

                {/* Autocomplete */}
                <Autocomplete
                    onInputChange={(event, value) => setSearch(value)}
                disablePortal
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="FIIs"/>}
                />
                {/* Botão para buscar */}
                <button onClick={fetchFiis} disabled={loading}>
                    {loading ? "Carregando..." : "Buscar"}
                </button>
            </form>
                
                
            
            {/* Input para busca por nome */}
            {/* <input
                type="text"
                placeholder="Buscar por nome (ex: MXRF11)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            /> */}

            {/* Inputs para filtros */}
           
            
           

            
            {/* Lista de FIIs */}
            {loading ? (
              <p className="skeleton-loader">Carregando...</p>
                ) : fiis.length > 0 && fiis[0].error  ? (
                    <h1>{fiis[0].error}</h1>
                ) : (
                    <ul>
                        {fiis.map((fii) => (
                            <li key={fii.papel}>
                                {fii.papel} - DY: {fii.DY} - P/VP: {fii.PVP}
                            </li>
                        ))}
                    </ul>
                )}
                
        </div>
    );
}

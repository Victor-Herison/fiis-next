import React from 'react';
import css from "@/app/globals.css"

export default function Header() {
    return (
        <header className='flex justify-between items-center p-4 bg-[#1F2937] h-23'>
            
            <a href="/" className='p-0 m-0'>
                <img src="/favicon.png" alt="icon" width={70} height={70} className='ml-20 hover:cursor-pointer hover:scale-115 transition-all duration-300'/>
            </a>
            <nav className='flex gap-6 text-white mr-20 text-center flex-row justify-center items-center text-xl'>
                <a href="/" className='hover:cursor-pointer hover:scale-110 hover:text-[#F59E0B] transition-all duration-300'>Filtros</a>
                <a href="/" className='hover:cursor-pointer hover:scale-110 hover:text-[#F59E0B] transition-all duration-300'>Calculadora</a>
                <a href="/" className='hover:cursor-pointer hover:scale-110 hover:text-[#F59E0B] transition-all duration-300'>Artigos</a>
                <button className='bg-white text-black px-4 py-1.5 rounded-md hover:cursor-pointer hover:bg-[#F59E0B] transition-all duration-300 hover:text-white'>Entrar</button>
            </nav>
        </header>
    )
}

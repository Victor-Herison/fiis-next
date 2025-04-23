"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-[#1F2937] w-full">
      <div className="flex justify-between items-center xl:px-12 px-5 py-4 relative">
        <Link href="/" className="p-0 m-0 z-20">
          <Image
            src="/favicon.png"
            alt="icon"
            width={70}
            height={70}
            className="hover:cursor-pointer hover:scale-105 transition-all duration-300"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden z-20 text-white hover:text-[#F59E0B] transition-all duration-300"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 text-white text-center items-center text-xl">
          <Link
            href="/wait"
            className="hover:cursor-pointer hover:scale-110 hover:text-[#F59E0B] transition-all duration-300"
          >
            Filtros
          </Link>
          <Link
            href="/calculadora"
            className="hover:cursor-pointer hover:scale-110 hover:text-[#F59E0B] transition-all duration-300"
          >
            Calculadora
          </Link>
          <Link
            href="/artigos"
            className="hover:cursor-pointer hover:scale-110 hover:text-[#F59E0B] transition-all duration-300"
          >
            Artigos
          </Link>
          <button className="bg-white text-black px-6 py-2 rounded-md hover:cursor-pointer hover:bg-[#F59E0B] transition-all duration-300 hover:text-white ml-4">
            Entrar
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-[#1F2937] z-10 lg:hidden transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
            <Link
              href="/wait"
              className="text-white hover:text-[#F59E0B] transition-all duration-300"
              onClick={toggleMenu}
            >
              Filtros
            </Link>
            <Link
              href="/calculadora"
              className="text-white hover:text-[#F59E0B] transition-all duration-300"
              onClick={toggleMenu}
            >
              Calculadora
            </Link>
            <Link
              href="/artigos"
              className="text-white hover:text-[#F59E0B] transition-all duration-300"
              onClick={toggleMenu}
            >
              Artigos
            </Link>
            <button className="bg-white text-black px-8 py-3 rounded-md hover:bg-[#F59E0B] transition-all duration-300 hover:text-white mt-4">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

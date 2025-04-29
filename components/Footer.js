import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white w-full mt-10 px-10">
      <div className="container mx-auto py-6 px-4 md:px-6">
        {/* Mobile layout (stacked) */}
        <div className="flex flex-col items-center space-y-6 md:hidden">
          <Link href="/wait" className="text-xl font-bold hover:text-[#F59E0B] transition-all duration-300">
            NewBoy
          </Link>

          <ul className="flex gap-6 justify-center">
            <li>
              <Link href="/wait" className="hover:text-[#F59E0B] transition-all duration-300">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/wait" className="hover:text-[#F59E0B] transition-all duration-300">
                Contato
              </Link>
            </li>
            <li>
              <Link href="/wait" className="hover:text-[#F59E0B] transition-all duration-300">
                Doe
              </Link>
            </li>
          </ul>

          <p className="text-gray-300 text-sm text-center">© 2025 NewBoy. Todos os direitos reservados.</p>
        </div>

        {/* Tablet layout (two rows) */}
        <div className="hidden md:flex md:flex-col lg:hidden space-y-4">
          <div className="flex justify-between items-center">
            <Link href="/wait" className="text-xl font-bold hover:text-[#F59E0B] transition-all duration-300">
              NewBoy
            </Link>

            <ul className="flex gap-6">
              <li>
                <Link href="/about" className="hover:text-[#F59E0B] transition-all duration-300">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/wait" className="hover:text-[#F59E0B] transition-all duration-300">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/wait" className="hover:text-[#F59E0B] transition-all duration-300">
                  Doe
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-gray-300">© 2025 NewBoy. Todos os direitos reservados.</p>
          </div>
        </div>

        {/* Desktop layout (single row) */}
        <div className="hidden lg:flex justify-between items-center">
          <Link href="/wait" className="text-xl font-bold hover:text-[#F59E0B] transition-all duration-300">
            NewBoy
          </Link>

          <p className="text-gray-300">© 2025 NewBoy. Todos os direitos reservados.</p>

          <ul className="flex gap-6">
            <li>
              <Link href="/wait" className="hover:text-[#F59E0B] transition-all duration-300">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/wait" className="hover:text-[#F59E0B] transition-all duration-300">
                Contato
              </Link>
            </li>
            <li>
              <Link href="/wait" className="hover:text-[#F59E0B] transition-all duration-300">
                Doe
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

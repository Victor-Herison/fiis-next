export default function Footer() {
    return (
        <footer className="bg-[#1F2937] text-white relative bottom-0 w-full h-20 flex justify-between items-center xl:px-25 px-5 mt-10">
            <a href="/wait" className="">
                <p className="text-xl font-bold hover:cursor-pointer hover:text-[#F59E0B] transition-all duration-300">NewBoy</p>
            </a>
            <p className="text-gray-300 ml-20 ">© 2025 NewBoy. Todos os direitos reservados.</p>
            <ul className="flex gap-4">
                <li>
                    <a href="/wait" className="hover:cursor-pointer hover:text-[#F59E0B] transition-all duration-300">
                        <p>Sobre</p>
                    </a>
                </li>
                <li>
                    <a href="/wait" className="hover:cursor-pointer hover:text-[#F59E0B] transition-all duration-300">
                        <p>Contato</p>
                    </a>
                </li>
                <li>
                    <a href="/wait" className="hover:cursor-pointer hover:text-[#F59E0B] transition-all duration-300">
                        <p>Doe</p>
                    </a>
                </li>
                
                
            </ul>
        </footer>
    )
}

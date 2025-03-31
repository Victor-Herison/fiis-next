
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Filtros de Fii",
  description: "Site que filtra fundos imobiliarios.",
  keywords: "Fundos imobiliarios, filtro, investimento, dicas, FIIs, FII, fiis",
  icons: {
    icon: "/favicon.png", // Caminho para o favicon
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 p-0 m-0">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        </body>
        
    </html>
  )
}
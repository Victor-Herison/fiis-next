import Header from "@/components/header";
import Footer from "@/components/footer";
export const metadata = {
  title: "Filtros de Fii",
  description: "Site que filtra fundos imobiliarios.",
  keywords: "Fundos imobiliarios, filtro, investimento, dicas, FIIs, FII, fiis",
  icons: {
    icon: "/icon.svg", // Caminho para o favicon
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="bg-[#F9FAFB]">
          {children}
        </main>
        <Footer />
        </body>
    </html>
  )
}
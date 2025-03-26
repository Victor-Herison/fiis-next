import Header from "@/components/header";
import Footer from "@/components/footer";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

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
    <html lang="en">
      <body className="bg-[#F9FAFB] p-0 m-0">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        </body>
    </html>
  )
}
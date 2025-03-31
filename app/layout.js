
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import Head from "next/head";
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
      <Head>
        <meta name="google-adsense-account" content="ca-pub-7395370785593703" />
      </Head>
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
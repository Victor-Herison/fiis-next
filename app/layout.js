import { GoogleAnalytics } from '@next/third-parties/google'

import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

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
      <head>
        
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7395370785593703"
        ></script></head>
      <body className="bg-gray-900 p-0 m-0">
        <Header />
        <main>
          {children}
          <SpeedInsights />
        </main>
        <Footer />
        
        </body>
        <GoogleAnalytics gaId="G-3P5P0XCVD1" />
        
    </html>
  )
}
import { GoogleAnalytics, GoogleTagManager  } from '@next/third-parties/google'

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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
      <meta name="google-site-verification" content="gOdsY24DgZ0uxVIJS-chvNIVGeWDe_iajLtBz7ZONKI" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7395370785593703"
        crossorigin="anonymous"></script>
        </head>
      <body className="bg-gray-900 p-0 m-0" suppressHydrationWarning>
        <Header />
       
        <main>   
           <ins className="adsbygoogle block"
              
              data-ad-client="ca-pub-7395370785593703"
              data-ad-slot="6442136295"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
          </script>   
          
          {children}
          <SpeedInsights />
        </main>
        <Footer />
        
        </body>
        <GoogleTagManager gtmId="G-3P5P0XCVD1"/>
        <GoogleAnalytics gaId="G-3P5P0XCVD1" />
        
    </html>
  )
}
import Script from "next/script";

const Adsense = () => {
    return (
        <Script
        async
            id="adsense"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7395370785593703"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    )
}

export default Adsense;

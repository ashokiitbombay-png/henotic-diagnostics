"use client";

import { useEffect } from "react";

export default function ThirdPartyScripts() {
  useEffect(() => {
    let scriptsLoaded = false;

    const loadScripts = () => {
      if (scriptsLoaded) return;
      scriptsLoaded = true;

      // Remove event listeners
      window.removeEventListener("scroll", loadScripts);
      window.removeEventListener("mousemove", loadScripts);
      window.removeEventListener("touchstart", loadScripts);
      window.removeEventListener("keydown", loadScripts);
      window.removeEventListener("click", loadScripts);

      console.log("⚡ [PSEO Performance] Loading Google Tag Manager & Google AdSense...");

      // 1. Google Tag Manager (GTM) script injection
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WKF28JPK');
      `;
      document.head.appendChild(gtmScript);

      // 2. Google AdSense script injection
      const adsenseScript = document.createElement("script");
      adsenseScript.async = true;
      adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2224247495448831";
      adsenseScript.crossOrigin = "anonymous";
      document.head.appendChild(adsenseScript);
    };

    // Attach event listeners
    window.addEventListener("scroll", loadScripts, { passive: true });
    window.addEventListener("mousemove", loadScripts, { passive: true });
    window.addEventListener("touchstart", loadScripts, { passive: true });
    window.addEventListener("keydown", loadScripts, { passive: true });
    window.addEventListener("click", loadScripts, { passive: true });

    // Idle fallback: Load scripts after 3.5 seconds if no interaction occurs
    const timeoutId = setTimeout(loadScripts, 3500);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", loadScripts);
      window.removeEventListener("mousemove", loadScripts);
      window.removeEventListener("touchstart", loadScripts);
      window.removeEventListener("keydown", loadScripts);
      window.removeEventListener("click", loadScripts);
    };
  }, []);

  return null;
}

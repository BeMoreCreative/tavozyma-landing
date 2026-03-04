import type { Metadata } from "next";
import Script from "next/script";
import { spaceGrotesk, inter, nunito } from "@/lib/fonts";
import "./globals.css";

const META_PIXEL_ID = "2203887990017796";
const GA_MEASUREMENT_ID = "G-MJ9XHW74TN";
const CLARITY_PROJECT_ID = "vqhtjt46ib";

export const metadata: Metadata = {
  title: "tavozyma.lt — Įrodykite savo darbą. Laimėkite klientus.",
  description:
    "Sukurkite patikrintą darbų portfolio. Jūsų klientai patvirtina atliktus darbus savo tikra tapatybe. Kaip automobilio istorijos ataskaita, tik jūsų darbams.",
  openGraph: {
    title: "tavozyma.lt — Įrodykite savo darbą",
    description: "Patikrintas darbų portfolio profesionalams.",
    type: "website",
    locale: "lt_LT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${CLARITY_PROJECT_ID}");
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

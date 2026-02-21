import type { Metadata } from "next";
import { spaceGrotesk, inter, nunito } from "@/lib/fonts";
import "./globals.css";

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
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import { Redis } from "@upstash/redis";
import type { Metadata } from "next";
import Link from "next/link";
import { nunito } from "@/lib/fonts";
import FbNav from "./FbNav";
import FbFormSection from "./FbFormSection";
import CookieNotice from "@/components/CookieNotice";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TavoŽyma — Tavo atlikti darbai, patvirtinti klientų",
  description:
    "Sukurk profilį, kur kiekvienas tavo darbas patvirtintas tikro kliento.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "TavoŽyma — Tavo darbai, patvirtinti klientų",
    description: "Skaitmeninis darbų pasas. Nemokama registracija.",
    type: "website",
    locale: "lt_LT",
  },
};

export default async function FbPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const utmParams = {
    source: String(params.utm_source ?? ""),
    medium: String(params.utm_medium ?? ""),
    campaign: String(params.utm_campaign ?? ""),
    content: String(params.utm_content ?? ""),
  };

  let waitlistCount = 0;
  try {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });
    waitlistCount = await redis.scard("waitlist:emails");
  } catch {
    waitlistCount = 0;
  }

  return (
    <>
      <FbNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bg-primary px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-2xl text-center hero-stagger">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent">
            Nemokama &middot; Užtrunka 10 sek.
          </span>

          <h1 className="hero-shimmer mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl leading-[1.1]">
            Tavo atlikti darbai.
            <br />
            Patvirtinti klientų.
          </h1>

          <p className="mt-5 text-lg text-text-on-dark-secondary md:text-xl max-w-lg mx-auto">
            Profilis, kuriame kiekvienas tavo darbas užfiksuotas ir patvirtintas tikro kliento. Kaip
            rekomendacija iš lūpų į lūpas — tik internete.
          </p>

          <div className="mt-8">
            <a
              href="#registracija"
              className="inline-block rounded-xl bg-accent px-8 py-4 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
            >
              Užsiregistruoti nemokamai
            </a>
            <p className="mt-3 text-sm text-text-on-dark-secondary/50">
              Jokių įsipareigojimų. Be banko kortelės.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-text-on-dark-secondary">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
            Pirmieji nariai jau registruojasi
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-display text-2xl font-bold text-text-on-dark md:text-3xl">
            Pažįstama situacija?
          </h2>

          <div className="mt-10 space-y-4">
            {[
              { emoji: "📱", text: "Klientas prašo darbų pavyzdžių — siunti nuotraukas iš galerijos" },
              { emoji: "🔒", text: "Nori parodyti buvusius projektus — bet kontaktų dalinti negali" },
              { emoji: "😤", text: "Dirbi 10+ metų — bet internete apie tave nėra nieko" },
              { emoji: "🤷", text: "Naujas klientas klausia rekomendacijų — neturi ką parodyti" },
            ].map((item) => (
              <div
                key={item.emoji}
                className="glass rounded-xl px-5 py-4 text-base text-text-on-dark"
              >
                <span className="mr-3">{item.emoji}</span>
                {item.text}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-lg text-text-on-dark-secondary">
            Tavo darbai kalba patys už save. Bet klientas to nemato — kol neturi kur parodyti.
          </p>

          <div className="mt-6 text-center">
            <a
              href="#registracija"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
            >
              Išspręsk tai per 10 sekundžių ↓
            </a>
          </div>
        </div>
      </section>

      {/* Solution / Mockup */}
      <section className="bg-bg-primary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-text-on-dark md:text-3xl">
            Tavo darbai. Vienoje vietoje.
          </h2>
          <p className="mt-3 text-text-on-dark-secondary">
            Klientas patvirtina — tu gauni įrodymą.
          </p>

          {/* Phone mockup matching ad creative */}
          <div className="mt-10 mx-auto max-w-[280px]">
            {/* Phone frame */}
            <div className="relative rounded-[2rem] border-[3px] border-white/15 bg-white shadow-2xl shadow-black/40 overflow-hidden">
              {/* Notch */}
              <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-black" />

              {/* Screen content */}
              <div className="px-4 pt-4 pb-5">
                {/* Profile header */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-bold">
                    TK
                  </div>
                  <div className="text-left">
                    <p className="flex items-center gap-1.5 font-semibold text-gray-900 text-[15px]">
                      Tomas Kazlauskas
                      <svg className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </p>
                    <p className="text-xs text-gray-500">Elektrikas &middot; Kaunas</p>
                  </div>
                </div>

                {/* Stats badges */}
                <div className="mt-3 flex gap-1.5">
                  {["15+ m.", "520+ darbų", "83 patv."].map((stat) => (
                    <span key={stat} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium text-gray-700">
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Section header */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Atlikti darbai</span>
                  </div>
                  <span className="text-[9px] text-gray-400">83 iš 83 patvirtinti</span>
                </div>

                {/* Work items — completed jobs */}
                <div className="mt-2.5 space-y-2">
                  {/* Featured item */}
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm ring-1 ring-black/[0.03]">
                    <div className="flex items-start justify-between">
                      <p className="text-[13px] font-semibold text-gray-900">Šildymo sistemos montavimas</p>
                      <span className="shrink-0 text-[9px] text-gray-400">2025-12</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <svg key={i} className="h-3 w-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                      <span className="ml-1 text-[10px] text-gray-400">Kaunas</span>
                    </div>
                    {/* Photo thumbnails */}
                    <div className="mt-2 flex gap-1">
                      <div className="h-10 w-14 rounded-md bg-gradient-to-br from-gray-200 to-gray-300" />
                      <div className="h-10 w-14 rounded-md bg-gradient-to-br from-gray-100 to-gray-200" />
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-[9px] text-gray-400">+4</div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                      <span className="text-[10px] text-gray-500">Patvirtino: Rūta J. &middot;</span>
                      <svg className="h-3 w-3 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                      <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-medium text-green-700">Patvirtintas darbas</span>
                    </div>
                  </div>

                  {/* Secondary items */}
                  <div className="rounded-xl border border-gray-100 bg-white p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-[13px] font-medium text-gray-900">Elektros instaliacijos atnaujinimas</p>
                      <span className="shrink-0 text-[9px] text-gray-400">2025-11</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[1,2,3,4].map((i) => (
                        <svg key={i} className="h-3 w-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                      <svg className="h-3 w-3 text-gray-200" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="ml-1 text-[10px] text-gray-400">Vilnius</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                      <span className="text-[10px] text-gray-500">Patvirtino: +370 6** ***12 &middot;</span>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-700">📱 SMS</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-white p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-[13px] font-medium text-gray-900">Apšvietimo montavimas</p>
                      <span className="shrink-0 text-[9px] text-gray-400">2025-09</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                      <span className="text-[10px] text-gray-500">marius.st***@gmail.com &middot;</span>
                      <span className="text-[10px] text-gray-400">✉️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="#registracija"
              className="inline-block rounded-xl bg-accent px-8 py-4 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
            >
              Sukurk savo profilį — nemokamai
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-text-on-dark-secondary/60 uppercase tracking-wider">
            Paklausėme meistrų grupėje:
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold text-text-on-dark md:text-3xl">
            &ldquo;Kaip patikrinti meistro kvalifikaciją?&rdquo;
          </h2>

          <div className="mt-8 flex justify-center gap-6 text-sm text-text-on-dark-secondary">
            <span className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-text-on-dark">64</span>
              komentarai
            </span>
            <span className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-text-on-dark">2 val</span>
              per tiek laiko
            </span>
            <span className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-text-on-dark">#1</span>
              problema
            </span>
          </div>

          <div className="mt-10 glass rounded-xl px-6 py-5 text-left">
            <p className="text-base italic text-text-on-dark leading-relaxed">
              &ldquo;Klientų numerių nedalinsiu ir svetimų žmonių po jų namus nevežiosiu.&rdquo;
            </p>
            <p className="mt-3 text-sm text-text-on-dark-secondary/60">
              — meistras iš grupės
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-bg-primary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                emoji: "✅",
                title: "Klientas pats patvirtina",
                description: "Nereikia dalinti kontaktų. Klientas gauna nuorodą ir patvirtina vienu paspaudimu.",
              },
              {
                emoji: "🔒",
                title: "Nekeičiama istorija",
                description: "Patvirtintų darbų negalima redaguoti ar paslėpti. Kaip banko išrašas — tik darbams.",
              },
              {
                emoji: "📲",
                title: "Siųsk nuorodą klientui",
                description: "Naujas klientas klausia pavyzdžių? Siųsk profilį. Viskas vienoje vietoje.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="glass rounded-xl p-6 text-center"
              >
                <p className="text-3xl">{card.emoji}</p>
                <h3 className="mt-3 font-display text-base font-semibold text-text-on-dark">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-on-dark-secondary">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <FbFormSection utmParams={utmParams} initialCount={waitlistCount} />

      {/* Footer */}
      <footer className="border-t border-border-dark bg-bg-primary px-6 py-8">
        <div className="mx-auto max-w-2xl text-center text-sm text-text-on-dark-secondary/60">
          <span className={nunito.className}>
            <span className="font-semibold">Tavo</span>
            <span className="font-extrabold text-accent">Žyma</span>
          </span>
          {" "}&middot; 2026 &middot;{" "}
          <Link
            href="/privatumo-politika"
            className="underline underline-offset-2 hover:text-text-on-dark-secondary transition-colors duration-200"
          >
            Privatumo politika
          </Link>
        </div>
      </footer>

      <CookieNotice />
    </>
  );
}

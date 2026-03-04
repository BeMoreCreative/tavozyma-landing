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
            {waitlistCount >= 5
              ? `Jau prisijungė ${waitlistCount}+ žmonių`
              : "Pirmieji nariai jau registruojasi"}
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

          {/* Static profile card mockup */}
          <div className="mt-10 mx-auto max-w-sm rounded-2xl border border-border-dark bg-bg-card p-6 text-left shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-lg font-bold text-accent">
                JP
              </div>
              <div>
                <p className="font-display font-semibold text-text-on-dark">Jonas P.</p>
                <p className="text-sm text-text-on-dark-secondary">Statybų meistras &middot; Vilnius</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-lg border border-border-dark bg-bg-secondary/50 px-4 py-3">
                <p className="text-sm font-medium text-text-on-dark">✅ Vonios remontas <span className="text-amber-400">★★★★★</span></p>
                <p className="mt-1 text-xs text-text-on-dark-secondary/60">Patvirtino: Rūta J.</p>
              </div>
              <div className="rounded-lg border border-border-dark bg-bg-secondary/50 px-4 py-3">
                <p className="text-sm font-medium text-text-on-dark">✅ Elektros instaliacija <span className="text-amber-400">★★★★</span><span className="text-text-on-dark-secondary/30">★</span></p>
                <p className="mt-1 text-xs text-text-on-dark-secondary/60">Patvirtino: +370 6*****12 &middot; SMS</p>
              </div>
              <div className="rounded-lg border border-border-dark bg-bg-secondary/50 px-4 py-3">
                <p className="text-sm font-medium text-text-on-dark">✅ Apšvietimo montavimas</p>
                <p className="mt-1 text-xs text-text-on-dark-secondary/60">Patvirtino: marius.st***@gmail.com</p>
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

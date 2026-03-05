import { Redis } from "@upstash/redis";
import type { Metadata } from "next";
import Link from "next/link";
import { nunito } from "@/lib/fonts";
import FbNav from "./FbNav";
import FbFormSection from "./FbFormSection";
import FbHeroForm from "./FbHeroForm";
import ClickToReveal from "./ClickToReveal";
import ProblemCards from "./ProblemCards";
import PhoneMockup from "./PhoneMockup";
import BenefitCards from "./BenefitCards";
import LiveCounter from "./LiveCounter";
import CookieNotice from "@/components/CookieNotice";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TavoŽyma — Įrodyk savo darbą. Laimėk klientus.",
  description:
    "Sukurk profilį, kuriame kiekvienas darbas patvirtintas tikro kliento. Siųsk nuorodą vietoj nuotraukų iš galerijos.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "TavoŽyma — Įrodyk savo darbą. Laimėk klientus.",
    description:
      "Sukurk profilį, kuriame kiekvienas darbas patvirtintas tikro kliento. Siųsk nuorodą vietoj nuotraukų iš galerijos.",
    type: "website",
    locale: "lt_LT",
    siteName: "TavoŽyma",
    images: [
      {
        url: "/images/og-fb.png",
        width: 1200,
        height: 630,
        alt: "TavoŽyma — Įrodyk savo darbą",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TavoŽyma — Įrodyk savo darbą. Laimėk klientus.",
    description:
      "Sukurk profilį, kuriame kiekvienas darbas patvirtintas tikro kliento.",
    images: ["/images/og-fb.png"],
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
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[13px] italic tracking-wide text-amber-700">
            Meistrams
          </span>

          <h1 className="hero-shimmer mt-5 font-display text-4xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Tavo darbas puikus.
            <br />
            Bet klientai to nemato.
          </h1>

          <p className="mt-5 text-base text-text-on-dark-secondary sm:text-lg md:text-xl max-w-lg mx-auto">
            Sukurk profilį, kuriame kiekvienas darbas patvirtintas tikro kliento. Siųsk nuorodą vietoj nuotraukų iš galerijos.
          </p>

          <div className="mt-8 mx-auto max-w-md w-full">
            <FbHeroForm utmParams={utmParams} />
            <p className="mt-2.5 text-[13px] text-text-on-dark-secondary">
              Nemokamai &middot; Pranešime, kai bus paruošta &middot;{" "}
              <Link
                href="/privatumo-politika"
                className="underline underline-offset-2 hover:text-text-on-dark-secondary transition-colors duration-200"
              >
                Privatumas
              </Link>
            </p>
          </div>

          <LiveCounter count={waitlistCount} />
        </div>
      </section>

      {/* Problem */}
      <section className="bg-bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-display text-2xl font-bold text-text-on-dark md:text-3xl">
            Pažįstama situacija?
          </h2>
          <p className="mt-2 text-center text-base text-text-on-dark-secondary">
            Paspausk ir sužinok sprendimą ↓
          </p>

          <ProblemCards />
        </div>
      </section>

      {/* Solution / Mockup */}
      <section className="bg-bg-primary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-text-on-dark md:text-3xl">
              Tavo darbai. Vienoje vietoje.
            </h2>
            <p className="mt-3 text-text-on-dark-secondary">
              Klientas patvirtina — tu gauni įrodymą.
            </p>
            <p className="mt-1 text-xs text-text-on-dark-secondary">
              Paspausk elementus ir pamatyk kaip veikia
            </p>
          </div>

          <PhoneMockup />
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-bg-secondary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-text-on-dark md:text-3xl">
            Štai ką klausia tavo būsimi klientai
          </h2>
          <p className="mt-2 text-base text-text-on-dark-secondary">
            Paspausk ir pamatyk atsakymą
          </p>

          <ClickToReveal
            message="Klientai ieško patikimų meistrų. Su TavoŽyma tavo darbai kalba už tave."
            ctaText="Užsiregistruok pirmas"
            ctaHref="#registracija"
            trackId="fb_post"
          >
          <div className="mt-8 mx-auto max-w-lg rounded-2xl bg-white p-4 shadow-lg sm:p-5 text-left select-none">
            {/* FB post header */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Meistrų ir statybininkų grupė</p>
                <p className="text-[11px] text-gray-500">Facebook grupė</p>
              </div>
            </div>
            {/* Post text */}
            <p className="mt-3 text-[14px] leading-relaxed text-gray-900">
              Sveiki, gal žinote kokiais būdais būtų galima patikrinti meistro kvalifikaciją? Kur būtų galima pamatyti atsiliepimus arba atliktų darbų kokybės įvertinimą? Ar darbą atliko iki galo ir pan.? Kokia yra praktika? Įsirenginėjame 120kv.m. namą, norime pataikyti ant kokybiškų meistrų, ačiū
            </p>
            {/* Reactions & comments bar */}
            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
              <div className="flex items-center gap-1">
                <span className="text-sm">😂👍</span>
                <span className="text-xs text-gray-500">18</span>
              </div>
              <span className="text-xs text-gray-500">101 komentaras</span>
            </div>
            <p className="mt-2 text-center text-[11px] text-gray-400">
              Tikras įrašas iš Facebook grupės
            </p>
          </div>
          </ClickToReveal>

          <ClickToReveal
            message="Nereikia dalinti klientų kontaktų. Su TavoŽyma klientas pats patvirtina darbą vienu paspaudimu."
            ctaText="Sužinok kaip tai veikia"
            ctaHref="#registracija"
            trackId="meistras_quote"
          >
          <div className="mt-8 glass rounded-xl px-6 py-5 text-left select-none">
            <p className="text-base italic text-text-on-dark leading-relaxed">
              &ldquo;Klientų numerių nedalinsiu ir svetimų žmonių po jų namus nevežiosiu.&rdquo;
            </p>
            <p className="mt-3 text-sm text-text-on-dark-secondary">
              — meistras iš grupės
            </p>
          </div>
          </ClickToReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-bg-primary px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-display text-2xl font-bold text-text-on-dark md:text-3xl">
            Kaip tai veikia?
          </h2>
          <p className="mt-2 text-center text-base text-text-on-dark-secondary">
            Paspausk ir sužinok daugiau ↓
          </p>

          <div className="mt-10">
            <BenefitCards />
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <FbFormSection utmParams={utmParams} initialCount={waitlistCount} />

      {/* Footer */}
      <footer className="border-t border-border-dark bg-bg-primary px-6 pt-8 pb-24 md:pb-8">
        <div className="mx-auto max-w-2xl text-center text-sm text-text-on-dark-secondary">
          <span className={nunito.className}>
            <span className="font-semibold">Tavo</span>
            <span className="font-extrabold text-amber-600">Žyma</span>
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

"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

const benefits = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Tavo profilis auga su atsiliepimais",
    description: "Kiekvienas patvirtintas darbas — tai įrodymas, kuris padeda laimėti naujus klientus ateityje.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    title: "Patikimumas klientams",
    description: "Tu negali keisti darbų istorijos — klientas tai mato ir pasitiki. Kaip banko išrašas, tik darbams.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    title: "Siųsk nuorodą vietoj įtikinėjimo",
    description: "Klientas vietoj tavo numerio gauna profilį su visais darbais. Nereikia daugiau įrodinėti kvalifikacijos.",
  },
];

type Phase = "title" | "fade-out" | "description" | "fade-back" | "idle";

export default function BenefitCards() {
  const [phases, setPhases] = useState<Record<number, Phase>>({});
  const tracked = useRef<Record<number, boolean>>({});
  const [tapped, setTapped] = useState<Record<number, boolean>>({});

  const handleClick = useCallback((index: number) => {
    const current = phases[index];
    if (current === "fade-out" || current === "description" || current === "fade-back") return;

    if (!tracked.current[index]) {
      tracked.current[index] = true;
      trackEvent("element_click", { element_id: `benefit_card_${index}` });
    }

    setTapped((prev) => ({ ...prev, [index]: true }));

    setPhases((p) => ({ ...p, [index]: "fade-out" }));

    setTimeout(() => {
      setPhases((p) => ({ ...p, [index]: "description" }));
    }, 250);

    setTimeout(() => {
      setPhases((p) => ({ ...p, [index]: "fade-back" }));
    }, 4000);

    setTimeout(() => {
      setPhases((p) => ({ ...p, [index]: "idle" }));
    }, 4250);
  }, [phases]);

  function getPhase(i: number): Phase {
    return phases[i] || "title";
  }

  function isShowingDescription(i: number) {
    const phase = getPhase(i);
    return phase === "description" || phase === "fade-back";
  }

  function isVisible(i: number) {
    const phase = getPhase(i);
    return phase !== "fade-out" && phase !== "fade-back";
  }

  return (
    <div className="space-y-4">
      {benefits.map((item, i) => (
        <div
          key={i}
          onClick={() => handleClick(i)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick(i);
          }}
          className="cursor-pointer"
        >
          <div className={`glass flex items-center gap-3 rounded-xl px-4 py-3.5 text-base text-text-on-dark sm:gap-4 sm:px-5 sm:py-4 transition-all duration-200 hover:bg-gray-50 ${
            !tapped[i] ? "animate-glow-pulse" : ""
          }`}>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                isShowingDescription(i)
                  ? "bg-accent/10 text-accent"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`transition-all duration-250 ${
                isShowingDescription(i) ? "text-text-on-dark-secondary" : "font-medium"
              } ${isVisible(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
            >
              {isShowingDescription(i) ? item.description : item.title}
            </span>
          </div>
        </div>
      ))}

      <div className="pt-4 text-center">
        <a
          href="#registracija"
          className="inline-block rounded-xl bg-accent px-8 py-4 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
        >
          Užsiregistruok pirmas
        </a>
      </div>
    </div>
  );
}

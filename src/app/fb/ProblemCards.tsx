"use client";

import { useState, useRef, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

const problems = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
    problem: "Klientas prašo darbų pavyzdžių — siunti nuotraukas iš galerijos",
    solution: "Su TavoŽyma — siųsk vieną nuorodą su visais patvirtintais darbais.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    problem: "Nori parodyti buvusius projektus — bet kontaktų dalinti negali",
    solution: "Klientas pats patvirtina darbą vienu paspaudimu. Jokių kontaktų dalinti nereikia.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    problem: "Dirbi 10+ metų — bet internete apie tave nėra nieko",
    solution: "Sukurk skaitmeninį darbų pasą per 2 minutes. Tavo patirtis pagaliau matoma.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    problem: "Naujas klientas klausia rekomendacijų — neturi ką parodyti",
    solution: "Tavo profilis su patvirtintais darbais — geriau nei bet kokia rekomendacija.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    problem: "Klientas patenkintas — bet atsiliepimo neparašo niekur",
    solution: "Viena nuoroda, vienas paspaudimas — darbas patvirtintas. Be tekstų ar registracijų.",
  },
];

const checkIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

type Phase = "problem" | "fade-out" | "solution" | "fade-back" | "idle";

export default function ProblemCards() {
  const [phases, setPhases] = useState<Record<number, Phase>>({});
  const tracked = useRef<Record<number, boolean>>({});
  const [tapped, setTapped] = useState<Record<number, boolean>>({});

  const handleClick = useCallback((index: number) => {
    const current = phases[index];
    // Ignore clicks during animation or while showing solution
    if (current === "fade-out" || current === "solution" || current === "fade-back") return;

    if (!tracked.current[index]) {
      tracked.current[index] = true;
      trackEvent("element_click", { element_id: `problem_card_${index}` });
    }

    setTapped((prev) => ({ ...prev, [index]: true }));

    // Phase 1: fade out problem text
    setPhases((p) => ({ ...p, [index]: "fade-out" }));

    // Phase 2: swap to solution (after fade out completes)
    setTimeout(() => {
      setPhases((p) => ({ ...p, [index]: "solution" }));
    }, 250);

    // Phase 3: start fading back to problem
    setTimeout(() => {
      setPhases((p) => ({ ...p, [index]: "fade-back" }));
    }, 3500);

    // Phase 4: swap back to problem
    setTimeout(() => {
      setPhases((p) => ({ ...p, [index]: "idle" }));
    }, 3750);
  }, [phases]);

  function getPhase(i: number): Phase {
    return phases[i] || "problem";
  }

  function isShowingSolution(i: number) {
    const phase = getPhase(i);
    return phase === "solution" || phase === "fade-back";
  }

  function isVisible(i: number) {
    const phase = getPhase(i);
    return phase !== "fade-out" && phase !== "fade-back";
  }

  return (
    <div className="mt-10 space-y-4">
      {problems.map((item, i) => (
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
                isShowingSolution(i)
                  ? "bg-accent/10 text-accent"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {isShowingSolution(i) ? checkIcon : item.icon}
            </span>
            <span
              className={`transition-all duration-250 ${
                isShowingSolution(i) ? "text-amber-700" : ""
              } ${isVisible(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
            >
              {isShowingSolution(i) ? item.solution : item.problem}
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

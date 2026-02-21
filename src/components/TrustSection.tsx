"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const trustCards = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Tikra tapatybė",
    description:
      "Kiekvienas patvirtinimas susietas su tikra asmens tapatybe — per Facebook, Google arba telefono numerį.",
    visual: (
      <div className="mt-5 space-y-2">
        {[
          { name: "Facebook", verified: true },
          { name: "Google", verified: false },
          { name: "Telefonas", verified: false },
        ].map((m) => (
          <div
            key={m.name}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${
              m.verified
                ? "bg-accent/10 text-accent"
                : "bg-white/[0.03] text-text-on-dark-secondary/40"
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                m.verified ? "bg-accent text-bg-primary" : "bg-white/[0.06]"
              }`}
            >
              {m.verified ? "✓" : "·"}
            </div>
            {m.name}
            {m.verified && (
              <span className="ml-auto text-xs">Patvirtinta</span>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-6.364-6.364L6.257 6.314a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "Nekeičiama istorija",
    description:
      "Patvirtinti darbai tampa nuolatiniais įrašais. Jų negalima redaguoti ar paslėpti — kaip banko išrašas.",
    visual: (
      <div className="mt-5 space-y-2">
        {[
          { date: "2025-01", name: "Vonios renovacija" },
          { date: "2025-03", name: "Virtuvės baldai" },
          { date: "2025-05", name: "Terasos statyba" },
        ].map((entry) => (
          <div
            key={entry.date}
            className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2"
          >
            <div className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-xs text-text-on-dark-secondary">
              {entry.date}
            </span>
            <span className="text-sm text-text-on-dark">{entry.name}</span>
            <svg className="ml-auto h-3.5 w-3.5 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    ),
    title: "Trys aiškios būsenos",
    description:
      "Klientas gali patvirtinti, atsisakyti arba dar neatsakyti. Kiekviena būsena matoma profilyje.",
    visual: (
      <div className="mt-5 space-y-2">
        {[
          { label: "Vonios renovacija", status: "confirmed" as const },
          { label: "Virtuvės baldai", status: "pending" as const },
          { label: "Terasos statyba", status: "declined" as const },
        ].map((s) => (
          <div
            key={s.label}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${
              s.status === "confirmed"
                ? "bg-accent/10"
                : s.status === "declined"
                  ? "bg-red-500/10"
                  : "bg-white/[0.03]"
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                s.status === "confirmed"
                  ? "bg-accent text-bg-primary"
                  : s.status === "declined"
                    ? "bg-red-500/80 text-white"
                    : "bg-white/[0.08] text-text-on-dark-secondary/50"
              }`}
            >
              {s.status === "confirmed" ? "✓" : s.status === "declined" ? "✕" : "·"}
            </div>
            <span className={
              s.status === "confirmed"
                ? "text-accent"
                : s.status === "declined"
                  ? "text-red-400/80"
                  : "text-text-on-dark-secondary/50"
            }>{s.label}</span>
            <span className={`ml-auto text-xs ${
              s.status === "confirmed"
                ? "text-accent"
                : s.status === "declined"
                  ? "text-red-400/60"
                  : "text-text-on-dark-secondary/40"
            }`}>
              {s.status === "confirmed" ? "Patvirtinta" : s.status === "declined" ? "Atsisakyta" : "Laukiama"}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      className="bg-bg-secondary px-6 py-20 md:px-10 md:py-32 opacity-0"
    >
      <div className="mx-auto max-w-6xl">
        {/* Intro */}
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Patikimumas
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-on-dark md:text-4xl">
            Saugumo standartai, kuriais
            <br />
            galite pasitikėti
          </h2>
          <p className="mt-4 text-base text-text-on-dark-secondary">
            Kiekvienas patvirtinimas yra tikras, nekeičiamas ir susietas su tikra tapatybe.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {trustCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl glass p-8 transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_40px_rgba(16,185,129,0.05)] hover:-translate-y-0.5"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="mt-5 font-display text-lg font-semibold text-text-on-dark">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-text-on-dark-secondary">
                {card.description}
              </p>

              {/* Visual */}
              {card.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

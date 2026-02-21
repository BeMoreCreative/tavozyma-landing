"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import WaitlistForm from "./WaitlistForm";

const benefits = [
  "Nemokamas planas ankstyvuosiams nariams",
  "Neriboti projektai ir patvirtinimai",
  "Prioritetinė pagalba ir konsultacijos",
];

export default function BottomCTA() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      className="bg-bg-primary px-6 py-20 md:px-10 md:py-32 opacity-0"
    >
      <div className="mx-auto max-w-[600px] text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-sm font-medium text-text-on-dark-secondary">
            Registracija į laukimo sąrašą
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight text-text-on-dark md:text-5xl">
          Pasiruošk įrodyti
          <br />
          savo darbą.
        </h2>

        <p className="mt-4 text-base text-text-on-dark-secondary">
          Sukurkite patikimą profilį. Dalinkitės juo su klientais.
          Tegul jūsų darbai kalba už save.
        </p>

        {/* Benefits */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2.5">
              <svg
                className="h-5 w-5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-text-on-dark-secondary">{b}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <p className="mt-8">
          <span className="text-text-on-dark-secondary/40 line-through text-sm">
            EUR 9/mėn.
          </span>
          {"  "}
          <span className="text-2xl font-display font-bold text-text-on-dark">
            EUR 0. Visam laikui.
          </span>
        </p>

        {/* Form */}
        <div className="mx-auto mt-8 max-w-md">
          <WaitlistForm id="final-form" variant="dark" />
        </div>

        <p className="mt-4 text-xs text-text-on-dark-secondary/40">
          Pranešime tik apie produkto paleidimą.
        </p>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrackLead from "./TrackLead";

export const metadata: Metadata = {
  title: "Ačiū! — TavoŽyma",
  description: "Jūs sėkmingai užsiregistravote į TavoŽyma laukimo sąrašą.",
};

const steps = [
  {
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Patvirtinimo laiškas",
    description: "Netrukus gausite patvirtinimo el. laišką.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    title: "Pranešime apie startą",
    description: "Kai platforma bus paruošta — sužinosite pirmieji.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "Pirmieji nariai — nemokamai",
    description: "Ankstyvieji nariai gaus prieigą nemokamai.",
  },
];

export default function AciuPage() {
  return (
    <>
      <TrackLead />
      <Header />
      <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          {/* Checkmark icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
            <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="mt-8 font-display text-4xl font-bold leading-tight tracking-tight text-text-on-dark md:text-5xl">
            Ačiū! Jūs užsiregistravote.
          </h1>

          <p className="mt-4 text-lg text-text-on-dark-secondary">
            Jūsų vieta sąraše užtikrinta. Štai kas bus toliau:
          </p>

          {/* What's next steps */}
          <div className="mt-12 flex flex-col gap-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="glass flex items-start gap-4 rounded-2xl px-6 py-5 text-left animate-fade-slide-up"
                style={{ animationDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-text-on-dark">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-on-dark-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Back to home CTA */}
          <Link
            href="/"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent/20 hover:border-accent/50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Grįžti į pagrindinį puslapį
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

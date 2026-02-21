import WaitlistForm from "./WaitlistForm";

export default function HeroSection() {
  return (
    <section className="grain relative px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl text-center hero-stagger">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-sm font-medium text-accent">
            Patikima darbų istorija
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl hero-shimmer">
          Jūsų darbų istorija.
          <br />
          Patvirtinta klientų.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-on-dark-secondary md:text-xl">
          Sukurkite patikimą darbo portfelį su tikrais klientų patvirtinimais.
          {" "}Kaip automobilio istorijos ataskaita, tik jūsų darbams.
        </p>

        {/* CTA */}
        <div className="mx-auto mt-10 max-w-md">
          <WaitlistForm id="hero-form" variant="dark" />
          <p className="mt-3 text-sm text-text-on-dark-secondary/60">
            Pranešime, kai produktas bus paruoštas.
          </p>
        </div>

        {/* Trust row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-text-on-dark-secondary">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Šifruota
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-6.364-6.364L6.257 6.314a4.5 4.5 0 001.242 7.244" />
            </svg>
            Nekeičiama
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zm8.446-7.189L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            Nemokama*
          </div>
        </div>
        <p className="mt-4 text-xs text-text-on-dark-secondary/40">
          *Gali būti taikomos naudojimo sąlygos ir apribojimai.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-1 animate-bounce-slow">
        <span className="text-xs text-text-on-dark-secondary/50">Sužinokite daugiau</span>
        <svg className="h-5 w-5 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-bg-primary z-10" />
    </section>
  );
}

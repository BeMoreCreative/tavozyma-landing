import WaitlistForm from "./WaitlistForm";

export default function HeroSection() {
  return (
    <section className="grain relative px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl text-center hero-stagger">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-sm font-medium text-accent">
            Skaitmeninis darbų pasas
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl hero-shimmer">
          Tavo atlikti darbai.
          <br />
          Patvirtinti klientų.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-on-dark-secondary md:text-xl">
          Kiekvienas atliktas darbas — užfiksuotas, patvirtintas ir visada pasiekiamas.
          {" "}Jūsų geriausia vizitinė kortelė.
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
            Nemokama
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Greita
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Patikima
          </div>
        </div>
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

"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type FormState = "idle" | "loading" | "success" | "error";

interface UtmParams {
  source: string;
  medium: string;
  campaign: string;
  content: string;
}

export default function FbFormSection({
  utmParams,
  initialCount,
}: {
  utmParams: UtmParams;
  initialCount: number;
}) {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [shakeError, setShakeError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [position, setPosition] = useState(initialCount);
  const [showSticky, setShowSticky] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const errorId = "form-error";

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // IntersectionObserver for sticky CTA visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function triggerShake(msg: string) {
    setShakeError(true);
    setErrorMsg(msg);
    setTimeout(() => setShakeError(false), 300);
    setTimeout(() => setErrorMsg(""), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      triggerShake("Įvesk galiojantį el. paštą");
      return;
    }

    setFormState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent: true,
          consentTimestamp: new Date().toISOString(),
          source: "fb_landing_page",
          utmContent: utmParams.content,
          utmSource: utmParams.source,
          utmMedium: utmParams.medium,
          utmCampaign: utmParams.campaign,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setPosition(data.position);

      if (data.isNew) {
        window.fbq?.("track", "Lead");
      }

      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMsg("Kažkas nepavyko. Bandyk dar kartą.");
    }
  }

  function smoothScrollToForm(e: React.MouseEvent) {
    e.preventDefault();
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const stickyVisible = showSticky && formState !== "success";

  return (
    <>
      <section
        ref={sectionRef}
        id="registracija"
        className="scroll-mt-20 bg-bg-primary px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-xl text-center">
          {formState === "success" ? (
            <div className="animate-fade-slide-up">
              <p className="text-4xl">✅</p>
              <h2 className="mt-4 font-display text-2xl font-bold text-text-on-dark md:text-3xl">
                Užsiregistravote!
              </h2>
              <p className="mt-3 text-text-on-dark-secondary">
                Pranešime, kai produktas bus paruoštas.
              </p>
              <p className="mt-2 text-sm text-text-on-dark-secondary/60">
                Jūs esate #{position} eilėje.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-on-dark md:text-4xl">
                Pradėk nuo pirmo darbo.
              </h2>
              <p className="mt-3 text-lg text-text-on-dark-secondary">
                Pirmieji nariai — visada nemokamai.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 w-full">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tavo@email.lt"
                    aria-label="El. paštas"
                    aria-describedby={errorMsg ? errorId : undefined}
                    className={`w-full rounded-xl sm:rounded-r-none px-4 py-3.5 text-base outline-none transition-all duration-200 bg-white/[0.06] border border-white/[0.1] text-text-on-dark placeholder:text-text-on-dark-secondary/40 focus:border-accent/40 focus:ring-2 focus:ring-accent/10 ${
                      shakeError ? "animate-shake border-error!" : ""
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full sm:w-auto whitespace-nowrap rounded-xl sm:rounded-l-none bg-accent px-6 py-3.5 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {formState === "loading" ? "Registruojama..." : "Užsiregistruoti"}
                  </button>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-text-on-dark-secondary/60 text-center">
                  Jokio spam&apos;o. Informuosime tik kai produktas bus paruoštas.{" "}
                  <Link
                    href="/privatumo-politika"
                    target="_blank"
                    className="text-text-on-dark-secondary/40 underline underline-offset-2 hover:text-text-on-dark-secondary/60 transition-colors duration-200"
                  >
                    Privatumo politika
                  </Link>
                </p>

                {errorMsg && (
                  <p id={errorId} className="mt-2 text-sm text-error">
                    {errorMsg}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-300 ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="bg-bg-primary/90 backdrop-blur-xl border-t border-border-dark px-4 py-3">
          <a
            href="#registracija"
            onClick={smoothScrollToForm}
            className="block w-full rounded-xl bg-accent py-3.5 text-center text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
          >
            Užsiregistruoti — nemokamai
          </a>
        </div>
      </div>
    </>
  );
}

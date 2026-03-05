"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

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
  const [scrollingUp, setScrollingUp] = useState(true);
  const lastScrollY = useRef(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [specialtySaved, setSpecialtySaved] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const hasFocused = useRef(false);
  const hasTyped = useRef(false);
  const formInteracted = useRef(false);
  const errorId = "form-error";
  const formId = "fb_landing_page";

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // Restore success state from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )tz_registered=(\d+)/);
    if (match) {
      setPosition(Number(match[1]));
      setFormState("success");
    }
    const emailMatch = document.cookie.match(/(?:^|; )tz_email=([^;]+)/);
    if (emailMatch) {
      setEmail(decodeURIComponent(emailMatch[1]));
    }
    if (document.cookie.includes("tz_specialty=1")) {
      setSpecialtySaved(true);
    }
  }, []);

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

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollingUp(y < lastScrollY.current && y > 400);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track form abandonment on page leave
  const abandonFired = useRef(false);
  useEffect(() => {
    function fireAbandon() {
      if (formInteracted.current && !abandonFired.current && formState !== "loading" && formState !== "success") {
        abandonFired.current = true;
        trackEvent("form_abandon", { form_id: formId });
      }
    }
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") fireAbandon();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", fireAbandon);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", fireAbandon);
    };
  }, [formState]);

  function handleFocus() {
    if (!hasFocused.current) {
      hasFocused.current = true;
      formInteracted.current = true;
      trackEvent("form_focus", { form_id: formId });
    }
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (!hasTyped.current && e.target.value.length > 0) {
      hasTyped.current = true;
      trackEvent("form_input", { form_id: formId });
    }
  }

  function triggerShake(msg: string) {
    setShakeError(true);
    setErrorMsg(msg);
    setTimeout(() => setShakeError(false), 300);
    setTimeout(() => setErrorMsg(""), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("form_submit_attempt", { form_id: formId });

    if (!isValidEmail(email)) {
      triggerShake("Įvesk galiojantį el. paštą");
      trackEvent("form_validation_error", {
        form_id: formId,
        error_type: "invalid_email",
      });
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

      // Remember registration for 30 days
      document.cookie = `tz_registered=${data.position};max-age=${60 * 60 * 24 * 30};path=/;SameSite=Lax`;
      document.cookie = `tz_email=${encodeURIComponent(email)};max-age=${60 * 60 * 24 * 30};path=/;SameSite=Lax`;

      formInteracted.current = false; // Prevent abandon event
      trackEvent("form_submit_success", { form_id: formId });
      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMsg("Kažkas nepavyko. Bandyk dar kartą.");
      trackEvent("form_submit_error", { form_id: formId });
    }
  }

  function smoothScrollToForm(e: React.MouseEvent) {
    e.preventDefault();
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const stickyVisible = showSticky && scrollingUp && formState !== "success";

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
                Užsiregistravote! Jūs esate #{position + 50} eilėje.
              </h2>
              <p className="mt-3 text-text-on-dark-secondary">
                Pranešime, kai bus paruošta.
              </p>

              {/* Specialty question */}
              {!specialtySaved ? (
                <div className="mt-8">
                  <p className="text-base font-medium text-text-on-dark">
                    Dar vienas klausimas — kokia tavo specialybė?
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["Elektrikas", "Santechnikas", "Statybininkas", "Apdailininkas", "Stogdengys"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedSpecialty(s);
                          setSpecialtySaved(true);
                          document.cookie = `tz_specialty=1;max-age=${60 * 60 * 24 * 30};path=/;SameSite=Lax`;
                          trackEvent("specialty_selected", { specialty: s });
                          fetch("/api/waitlist", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, specialty: s }),
                          });
                        }}
                        className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                          selectedSpecialty === s
                            ? "border-accent bg-accent/20 text-amber-700"
                            : "border-gray-200 bg-gray-50 text-text-on-dark hover:border-accent/30 hover:bg-accent/10"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {/* "Kita" option */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <input
                      type="text"
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value.slice(0, 50))}
                      placeholder="Kita specialybė..."
                      className="w-48 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-text-on-dark placeholder:text-text-on-dark-secondary/40 outline-none focus:border-accent/40"
                    />
                    <button
                      onClick={() => {
                        if (!otherText.trim()) return;
                        setSelectedSpecialty("Kita");
                        setSpecialtySaved(true);
                        document.cookie = `tz_specialty=1;max-age=${60 * 60 * 24 * 30};path=/;SameSite=Lax`;
                        trackEvent("specialty_selected", {
                          specialty: "Kita",
                          specialty_other: otherText.trim(),
                        });
                        fetch("/api/waitlist", {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email, specialty: "Kita", specialtyOther: otherText.trim() }),
                        });
                      }}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-text-on-dark hover:border-accent/30 hover:bg-accent/10 transition-all duration-200"
                    >
                      Siųsti
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-6 text-sm text-amber-700">Ačiū! ✓</p>
              )}
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
                    onFocus={handleFocus}
                    onChange={handleEmailChange}
                    placeholder="tavo@email.lt"
                    aria-label="El. paštas"
                    aria-describedby={errorMsg ? errorId : undefined}
                    className={`w-full rounded-xl sm:rounded-r-none px-4 py-3.5 text-base outline-none transition-all duration-200 bg-gray-50 border border-gray-200 text-text-on-dark placeholder:text-text-on-dark-secondary/40 focus:border-accent/40 focus:ring-2 focus:ring-accent/10 ${
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

                <p className="mt-3 text-xs leading-relaxed text-text-on-dark-secondary text-center">
                  Jokio spam&apos;o. Informuosime tik kai produktas bus paruoštas.{" "}
                  <Link
                    href="/privatumo-politika"
                    target="_blank"
                    className="text-text-on-dark-secondary underline underline-offset-2 hover:text-text-on-dark transition-colors duration-200"
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
            Užsiregistruok pirmas
          </a>
        </div>
      </div>
    </>
  );
}

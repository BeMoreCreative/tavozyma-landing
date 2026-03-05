"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

import { useState, useRef, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface UtmParams {
  source: string;
  medium: string;
  campaign: string;
  content: string;
}

export default function FbHeroForm({ utmParams }: { utmParams: UtmParams }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [shakeError, setShakeError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hasFocused = useRef(false);
  const hasTyped = useRef(false);
  const formInteracted = useRef(false);
  const abandonFired = useRef(false);
  const formId = "fb_hero";

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // Restore success state from cookie
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )tz_registered=(\d+)/);
    if (match) setState("success");
  }, []);

  // Track form abandonment
  useEffect(() => {
    function fireAbandon() {
      if (formInteracted.current && !abandonFired.current && state !== "loading" && state !== "success") {
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
  }, [state]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("form_submit_attempt", { form_id: formId });

    if (!isValidEmail(email)) {
      setShakeError(true);
      setErrorMsg("Įvesk galiojantį el. paštą");
      setTimeout(() => setShakeError(false), 300);
      setTimeout(() => setErrorMsg(""), 2000);
      trackEvent("form_validation_error", {
        form_id: formId,
        error_type: "invalid_email",
      });
      return;
    }

    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent: true,
          consentTimestamp: new Date().toISOString(),
          source: "fb_hero",
          utmContent: utmParams.content,
          utmSource: utmParams.source,
          utmMedium: utmParams.medium,
          utmCampaign: utmParams.campaign,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      if (data.isNew) {
        window.fbq?.("track", "Lead");
      }

      document.cookie = `tz_registered=${data.position};max-age=${60 * 60 * 24 * 30};path=/;SameSite=Lax`;
      document.cookie = `tz_email=${encodeURIComponent(email)};max-age=${60 * 60 * 24 * 30};path=/;SameSite=Lax`;

      formInteracted.current = false;
      trackEvent("form_submit_success", { form_id: formId });
      setState("success");

      // Scroll to bottom section for specialty question
      setTimeout(() => {
        document.getElementById("registracija")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } catch {
      setState("error");
      setErrorMsg("Kažkas nepavyko. Bandyk dar kartą.");
      trackEvent("form_submit_error", { form_id: formId });
    }
  }

  if (state === "success") {
    return (
      <p className="text-sm text-amber-700 font-medium">
        Užsiregistruota! ↓ Atsakyk dar vieną klausimą žemiau
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
        <input
          type="email"
          value={email}
          onFocus={handleFocus}
          onChange={handleEmailChange}
          placeholder="tavo@email.lt"
          aria-label="El. paštas"
          className={`w-full rounded-xl sm:rounded-r-none px-4 py-3.5 text-base outline-none transition-all duration-200 bg-gray-50 border border-gray-200 text-text-on-dark placeholder:text-text-on-dark-secondary/40 focus:border-accent/40 focus:ring-2 focus:ring-accent/10 ${
            shakeError ? "animate-shake border-error!" : ""
          }`}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full sm:w-auto whitespace-nowrap rounded-xl sm:rounded-l-none bg-accent px-6 py-3.5 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {state === "loading" ? "Registruojama..." : "Užsiregistruoti"}
        </button>
      </div>
      {errorMsg && <p className="mt-2 text-sm text-error">{errorMsg}</p>}
    </form>
  );
}

"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type FormState = "idle" | "loading" | "error";

export default function WaitlistForm({
  id,
  variant = "dark",
}: {
  id?: string;
  variant?: "dark" | "light";
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [shakeError, setShakeError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hasFocused = useRef(false);
  const hasTyped = useRef(false);
  const formInteracted = useRef(false);

  const formId = id || "unknown";

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // Track form abandonment on page leave
  const abandonFired = useRef(false);
  useEffect(() => {
    function fireAbandon() {
      if (formInteracted.current && !abandonFired.current && state !== "loading") {
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
  }, [formId, state]);

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

  function handleConsentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConsent(e.target.checked);
    trackEvent("consent_toggle", {
      form_id: formId,
      checked: e.target.checked,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("form_submit_attempt", { form_id: formId });

    if (!isValidEmail(email)) {
      setShakeError(true);
      setErrorMsg("Įveskite teisingą el. paštą.");
      setTimeout(() => setShakeError(false), 300);
      setTimeout(() => setErrorMsg(""), 2000);
      trackEvent("form_validation_error", {
        form_id: formId,
        error_type: "invalid_email",
      });
      return;
    }

    if (!consent) {
      setShakeError(true);
      setErrorMsg("Turite sutikti su privatumo politika.");
      setTimeout(() => setShakeError(false), 300);
      setTimeout(() => setErrorMsg(""), 2000);
      trackEvent("form_validation_error", {
        form_id: formId,
        error_type: "no_consent",
      });
      return;
    }

    setState("loading");

    let utmContent = "organic";
    try {
      utmContent = new URLSearchParams(window.location.search).get("utm_content") || "organic";
    } catch {}

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent: true,
          consentTimestamp: new Date().toISOString(),
          source: id || "unknown",
          utmContent,
        }),
      });

      if (!res.ok) throw new Error();

      formInteracted.current = false; // Prevent abandon event
      trackEvent("form_submit_success", { form_id: formId });
      router.push("/aciu");
    } catch {
      setState("error");
      setErrorMsg("Kažkas nepavyko. Bandykite dar kartą.");
      trackEvent("form_submit_error", { form_id: formId });
    }
  }

  const isDark = variant === "dark";

  return (
    <form id={id} onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
        <input
          type="email"
          value={email}
          onFocus={handleFocus}
          onChange={handleEmailChange}
          placeholder="jusu@email.lt"
          aria-label="El. paštas"
          className={`w-full rounded-xl sm:rounded-r-none px-4 py-3.5 text-base outline-none transition-all duration-200 ${
            isDark
              ? "bg-white/[0.06] border border-white/[0.1] text-text-on-dark placeholder:text-text-on-dark-secondary/40 focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
              : "bg-white border border-border-light text-text-on-light placeholder:text-text-on-light-secondary/50 focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
          } ${shakeError ? "animate-shake border-error!" : ""}`}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="whitespace-nowrap rounded-xl sm:rounded-l-none bg-accent px-6 py-3.5 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {state === "loading" ? "Registruojama..." : "Užsiregistruoti"}
        </button>
      </div>

      {/* Privacy consent */}
      <label className="mt-3 flex items-start gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={handleConsentChange}
          className={`mt-0.5 h-4 w-4 shrink-0 rounded border appearance-none cursor-pointer transition-all duration-200 ${
            isDark
              ? "border-white/20 bg-white/[0.06] checked:bg-accent checked:border-accent"
              : "border-gray-300 bg-white checked:bg-accent checked:border-accent"
          }`}
        />
        <span className={`text-xs leading-relaxed ${
          isDark ? "text-text-on-dark-secondary/60" : "text-text-on-light-secondary/70"
        }`}>
          Sutinku su{" "}
          <Link
            href="/privatumo-politika"
            target="_blank"
            className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
          >
            privatumo politika
          </Link>
          . El. paštas bus naudojamas tik informuoti apie TavoŽyma.
        </span>
      </label>

      {errorMsg && <p className="mt-2 text-sm text-error">{errorMsg}</p>}
    </form>
  );
}

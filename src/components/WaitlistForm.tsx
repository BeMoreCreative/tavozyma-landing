"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

import { useState } from "react";
import Link from "next/link";

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({
  id,
  variant = "dark",
}: {
  id?: string;
  variant?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [shakeError, setShakeError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setShakeError(true);
      setErrorMsg("Įveskite teisingą el. paštą.");
      setTimeout(() => setShakeError(false), 300);
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }

    if (!consent) {
      setShakeError(true);
      setErrorMsg("Turite sutikti su privatumo politika.");
      setTimeout(() => setShakeError(false), 300);
      setTimeout(() => setErrorMsg(""), 2000);
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
          source: id || "unknown",
        }),
      });

      if (!res.ok) throw new Error();

      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }

      setState("success");
    } catch {
      setState("error");
      setErrorMsg("Kažkas nepavyko. Bandykite dar kartą.");
    }
  }

  const isDark = variant === "dark";

  if (state === "success") {
    return (
      <div
        id={id}
        className={`rounded-2xl p-6 ${
          isDark ? "glass" : "bg-accent/5 border border-accent/10"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
            <svg
              className="h-5 w-5 text-bg-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className={`text-lg font-semibold ${isDark ? "text-accent" : "text-accent"}`}>
              Užregistruota!
            </p>
            <p className={`text-sm ${isDark ? "text-text-on-dark-secondary" : "text-text-on-light-secondary"}`}>
              Pranešime, kai būsime pasiruošę.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setConsent(e.target.checked)}
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

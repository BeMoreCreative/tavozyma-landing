"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ClickToReveal({
  children,
  message,
  ctaText,
  ctaHref,
  trackId,
}: {
  children: React.ReactNode;
  message: string;
  ctaText: string;
  ctaHref: string;
  trackId: string;
}) {
  const [revealed, setRevealed] = useState(false);

  function handleClick() {
    if (!revealed) {
      setRevealed(true);
      trackEvent("element_click", { element_id: trackId });
    }
  }

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className={`cursor-pointer rounded-2xl transition-all duration-500 ${
          !revealed ? "animate-glow-pulse" : ""
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
      >
        {children}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          revealed ? "max-h-32 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-xl border border-accent/20 bg-accent/5 px-5 py-3.5 text-center">
          <p className="text-base text-text-on-dark-secondary">{message}</p>
          <a
            href={ctaHref}
            className="mt-2 inline-block text-base font-semibold text-amber-700 hover:text-amber-800 transition-colors duration-200"
          >
            {ctaText} →
          </a>
        </div>
      </div>
    </div>
  );
}

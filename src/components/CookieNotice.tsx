"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cookie-notice-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem("cookie-notice-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 pointer-events-none">
      <div className="mx-auto max-w-lg pointer-events-auto rounded-xl border border-border-dark bg-bg-secondary/95 backdrop-blur-lg px-5 py-3.5 shadow-lg flex items-center gap-4">
        <p className="text-xs text-text-on-dark-secondary leading-relaxed">
          Ši svetainė naudoja būtinuosius, analitinius ir rinkodaros slapukus.{" "}
          <Link
            href="/privatumo-politika"
            className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
          >
            Privatumo politika
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 rounded-lg bg-white/[0.06] border border-white/[0.1] px-3 py-1.5 text-xs font-medium text-text-on-dark hover:bg-white/[0.1] transition-colors duration-200"
        >
          Supratau
        </button>
      </div>
    </div>
  );
}

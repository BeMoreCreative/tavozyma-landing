"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function LiveCounter({ count }: { count: number }) {
  const [revealed, setRevealed] = useState(false);

  function handleClick() {
    if (!revealed) {
      setRevealed(true);
      trackEvent("element_click", { element_id: "live_counter" });
    }
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-text-on-dark-secondary transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 active:scale-[0.97]"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
        <span
          className={`transition-all duration-300 ${
            revealed ? "text-amber-700 font-medium" : ""
          }`}
        >
          {revealed
            ? count > 0
              ? `Jau ${count}+ užsiregistravusių!`
              : "Dešimtys jau registruojasi!"
            : "Pirmieji nariai jau registruojasi"}
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          revealed ? "max-h-16 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <a
          href="#registracija"
          className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors duration-200"
        >
          Prisijunk ir tu →
        </a>
      </div>
    </div>
  );
}

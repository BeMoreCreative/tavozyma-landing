"use client";

import { useEffect, useState } from "react";
import { nunito } from "@/lib/fonts";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex h-16 items-center justify-between px-6 md:px-10 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-dark"
          : "bg-transparent"
      }`}
    >
      <span className={`${nunito.className} text-[26px] tracking-[-0.02em] text-text-on-dark`}>
        <span className="font-semibold">Tavo</span>
        <span className="font-extrabold text-accent">Žyma</span>
      </span>
      <a
        href="#final-form"
        className="rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent/20 hover:border-accent/50"
      >
        Užsiregistruoti
      </a>
    </header>
  );
}

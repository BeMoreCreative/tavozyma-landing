"use client";

import { useEffect, useState } from "react";
import { nunito } from "@/lib/fonts";

export default function FbNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.getElementById("registracija")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`sticky top-0 z-50 flex h-16 items-center justify-between px-6 md:px-10 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-dark"
          : "bg-transparent"
      }`}
    >
      <span className={`${nunito.className} text-[22px] tracking-[-0.02em] text-text-on-dark sm:text-[26px]`}>
        <span className="font-semibold">Tavo</span>
        <span className="font-extrabold text-amber-600">Žyma</span>
      </span>
      <a
        href="#registracija"
        onClick={smoothScroll}
        className="rounded-full border border-accent/30 px-3.5 py-1.5 text-xs font-medium text-text-on-dark transition-all duration-200 hover:border-accent/50 hover:bg-accent/5 sm:px-5 sm:py-2 sm:text-sm"
      >
        Užsiregistruok pirmas
      </a>
    </header>
  );
}

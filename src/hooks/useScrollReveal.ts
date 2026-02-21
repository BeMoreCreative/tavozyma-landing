"use client";

import { useEffect, type RefObject } from "react";

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { delay?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.style.opacity = "1";
      return;
    }

    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${options?.delay ?? 0}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${options?.delay ?? 0}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.delay]);
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { nunito } from "@/lib/fonts";

/* ─── Inline SVG Icons ─── */

function IconPhone({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function IconFacebook({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.018 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796v8.437C19.612 23.09 24 18.098 24 12.073z" />
    </svg>
  );
}

function IconGoogle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function IconEmail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconCheck({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconClock({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconBell({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}

function IconPlus({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function IconChevronRight({ className = "h-2 w-2" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

/* ─── Platform Icon Helper (large, colored) ─── */

function PlatformIcon({ method, size = "lg" }: { method: string; size?: "lg" | "sm" }) {
  const cls = size === "lg" ? "h-8 w-8 md:h-10 md:w-10" : "h-5 w-5";
  switch (method) {
    case "sms":
      return <IconPhone className={`${cls} text-emerald-400`} />;
    case "facebook":
      return <IconFacebook className={`${cls} text-[#1877F2]`} />;
    case "google":
      return <IconGoogle className={cls} />;
    case "email":
      return <IconEmail className={`${cls} text-sky-400`} />;
    default:
      return null;
  }
}

/* ─── Data ─── */

interface LogEntry {
  project: string;
  date: string;
  status: "confirmed" | "pending" | "new";
  method: "sms" | "facebook" | "google" | "email" | "none";
  methodLabel: string;
  client: string;
}

const ENTRIES: LogEntry[] = [
  { project: "Vonios renovacija", date: "2025-02", status: "confirmed", method: "sms", methodLabel: "SMS", client: "+3706****452" },
  { project: "Biuro interjeras", date: "2025-01", status: "confirmed", method: "facebook", methodLabel: "Facebook", client: "Tomas K." },
  { project: "Terasos statyba", date: "2024-12", status: "confirmed", method: "google", methodLabel: "Google", client: "r***a@gmail.com" },
  { project: "Elektros instaliacija", date: "2025-02", status: "pending", method: "sms", methodLabel: "SMS", client: "+3705****891" },
  { project: "Virtuvės baldai", date: "2024-11", status: "confirmed", method: "facebook", methodLabel: "Facebook", client: "Laura M." },
  { project: "Stogo remontas", date: "2025-03", status: "new", method: "none", methodLabel: "", client: "" },
  { project: "Fasado dažymas", date: "2024-10", status: "confirmed", method: "email", methodLabel: "El. paštas", client: "+3706****789" },
];

/* ─── Constants ─── */

const AUTO_MS = 3000;
const MANUAL_PAUSE_MS = 8000;
const SWIPE_THRESHOLD = 50;

/* ─── Component ─── */

export default function WorkLogBubbles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (prefersReducedMotion) { el.style.opacity = "1"; return; }
    el.style.transform = "translateY(32px)";
    el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
  }, [prefersReducedMotion]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setViewportWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const shouldAutoAdvance = isInView && !isHovering && !isPaused && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAutoAdvance) {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % ENTRIES.length);
    }, AUTO_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [shouldAutoAdvance, activeIndex]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), MANUAL_PAUSE_MS);
  }, []);

  useEffect(() => {
    return () => { if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current); };
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) goTo(Math.min(activeIndex + 1, ENTRIES.length - 1));
    else goTo(Math.max(activeIndex - 1, 0));
  }, [activeIndex, goTo]);

  const slideWidth = viewportWidth < 768 ? 176 : 208;
  const gap = viewportWidth < 768 ? 16 : 20;
  const trackOffset = viewportWidth > 0
    ? viewportWidth / 2 - activeIndex * (slideWidth + gap) - slideWidth / 2
    : 0;
  const hydrated = viewportWidth > 0;

  return (
    <div
      ref={sectionRef}
      className="bg-bg-primary px-6 py-12 md:py-16 opacity-0 overflow-hidden"
    >
      <div className="mx-auto max-w-4xl relative">
        {/* Heading + stat */}
        <div className="text-center mb-6 md:mb-8">
          <div className="mb-2">
            <span className={`${nunito.className} text-base md:text-lg font-bold text-accent`}>tavozyma</span>
            <span className="text-base md:text-lg font-bold text-text-on-dark-secondary">.lt</span>
          </div>
          <p className="font-display text-lg md:text-xl font-semibold text-text-on-dark">
            Kiekvienas atliktas darbas — užfiksuotas ir patvirtintas
          </p>
          <p className="mt-1.5 text-sm text-text-on-dark-secondary">
            <span className="font-display font-bold text-accent">87%</span> klientų tikrina reputaciją prieš samdydami
          </p>
        </div>

        {/* Fixed chain rail */}
        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-white/[0.08] -translate-y-1/2 z-0" />

        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 md:h-64 md:w-64 rounded-full bg-accent/[0.03] blur-3xl pointer-events-none z-0" />

        {/* Carousel viewport */}
        <div
          ref={viewportRef}
          className="relative z-10 overflow-x-hidden overflow-y-visible"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={`wl-track flex items-start ${!hydrated ? "opacity-0" : ""}`}
            style={{ gap: `${gap}px`, transform: `translateX(${trackOffset}px)` }}
          >
            {ENTRIES.map((entry, i) => {
              const distance = Math.abs(i - activeIndex);
              const isActive = distance === 0;
              const isAdjacent = distance === 1;

              const scale = isActive ? 1 : isAdjacent ? 0.7 : 0.5;
              const opacity = isActive ? 1 : isAdjacent ? 0.5 : 0.2;
              const blur = viewportWidth >= 768
                ? isActive ? 0 : isAdjacent ? 2 : 4
                : 0;

              const isConfirmed = entry.status === "confirmed";
              const isPending = entry.status === "pending";
              const isNew = entry.status === "new";

              const borderCls = isActive && isConfirmed
                ? "border-accent/20"
                : isActive && isPending
                  ? "border-amber-500/20"
                  : "border-border-dark";

              return (
                <div
                  key={i}
                  className="wl-slide shrink-0 cursor-pointer flex flex-col items-center"
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : undefined,
                  }}
                  onClick={() => { if (!isActive) goTo(i); }}
                >
                  {/* ── Bubble (completed work entry) ── */}
                  <div className="relative">
                    {/* Glow halo behind bubble */}
                    {isActive && isConfirmed && (
                      <div key={`glow-${activeIndex}`} className="wl-confirm-glow absolute -inset-3 rounded-full pointer-events-none" />
                    )}
                    {isActive && isPending && (
                      <div key={`glow-${activeIndex}`} className="wl-pending-glow absolute -inset-3 rounded-full pointer-events-none" />
                    )}

                    <div
                      className={`relative h-44 w-44 md:h-52 md:w-52 rounded-full flex flex-col items-center justify-center p-4 md:p-5 ${
                        isNew
                          ? "border border-dashed border-white/[0.15]"
                          : `bg-bg-card border ${borderCls}`
                      }`}
                    >
                      {/* Inner tint */}
                      {isActive && isConfirmed && (
                        <div className="absolute inset-0 rounded-full bg-accent/[0.04] pointer-events-none" />
                      )}
                      {isActive && isPending && (
                        <div className="absolute inset-0 rounded-full bg-amber-500/[0.03] pointer-events-none" />
                      )}



                      {isNew ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <IconPlus className="h-6 w-6 text-white/20" />
                          <span className="text-[9px] text-white/20 font-medium uppercase tracking-wide">
                            Naujas įrašas
                          </span>
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center gap-1 md:gap-1.5">
                          {/* Project name — prominent */}
                          <span className="text-xs md:text-sm font-bold text-text-on-dark text-center leading-tight">
                            {entry.project}
                          </span>

                          {/* Date */}
                          <span className="text-[9px] md:text-[10px] text-text-on-dark-secondary/50 font-mono tabular-nums">
                            {entry.date}
                          </span>

                          {/* Status indicator inside bubble */}
                          {isConfirmed && (
                            <div className="flex items-center gap-1 mt-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                              <span className="text-[8px] md:text-[9px] font-medium text-accent/70">
                                Darbas atliktas
                              </span>
                            </div>
                          )}
                          {isPending && (
                            <div className="flex items-center gap-1 mt-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              <span className="text-[8px] md:text-[9px] font-medium text-amber-500/70">
                                Laukia atsiliepimo
                              </span>
                            </div>
                          )}

                          {/* "plačiau" pill — fades in when active */}
                          {isActive && (
                            <div key={`btn-${activeIndex}`} className="wl-detail-in flex items-center gap-0.5 rounded-full bg-white/[0.06] px-2.5 py-0.5 mt-1">
                              <span className="text-[7px] md:text-[8px] font-semibold text-text-on-dark-secondary/80">plačiau</span>
                              <IconChevronRight className="h-2 w-2 text-text-on-dark-secondary/60" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Stem + Status below bubble (platform + feedback) ── */}
                  <div className="flex flex-col items-center mt-0 relative" style={{ minHeight: isActive ? 80 : 28 }}>
                    {/* Vertical stem */}
                    <div className={`w-px h-3 ${isConfirmed ? "bg-accent/30" : isPending ? "bg-amber-500/30" : "bg-white/[0.08]"}`} />

                    {/* Status node */}
                    {isConfirmed && (
                      <div className="flex flex-col items-center">
                        {/* Checkbox circle — pops in */}
                        <div
                          key={isActive ? `ck-${activeIndex}` : `s-${i}`}
                          className={isActive ? "wl-badge-pop" : ""}
                        >
                          <div className="h-6 w-6 md:h-7 md:w-7 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                            <IconCheck className="h-3.5 w-3.5 md:h-4 md:w-4 text-bg-primary" />
                          </div>
                        </div>

                        {/* Active: platform icon + feedback label + client */}
                        {isActive && (
                          <div key={`det-${activeIndex}`} className="wl-detail-in flex flex-col items-center gap-1 mt-1.5">
                            <div className="flex items-center gap-1.5">
                              <PlatformIcon method={entry.method} size="sm" />
                              <span className="text-[9px] md:text-[10px] font-bold text-accent">
                                Klientas patvirtino
                              </span>
                            </div>
                            <span className="text-[8px] text-text-on-dark-secondary/50 font-mono">
                              {entry.client}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {isPending && (
                      <div className="flex flex-col items-center">
                        {/* Clock circle */}
                        <div className="h-6 w-6 md:h-7 md:w-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                          <IconClock className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-500" />
                        </div>

                        {/* Active: waiting + reminder */}
                        {isActive ? (
                          <div className="flex flex-col items-center gap-1 mt-1.5">
                            <div className="flex items-center gap-1.5">
                              <PlatformIcon method={entry.method} size="sm" />
                              <span className="text-[9px] md:text-[10px] font-bold text-amber-500">
                                Laukiama atsiliepimo
                              </span>
                            </div>
                            <div key={`rem-${activeIndex}`} className="wl-reminder-in flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5">
                              <span className="wl-bell-wiggle inline-flex">
                                <IconBell className="h-2.5 w-2.5 text-amber-500" />
                              </span>
                              <span className="text-[7px] md:text-[8px] font-semibold text-amber-500">
                                Priminimas išsiųstas
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[8px] text-amber-500/50 font-medium mt-1">
                            Laukiama
                          </span>
                        )}
                      </div>
                    )}

                    {isNew && (
                      <div className="h-2 w-2 rounded-full border border-dashed border-white/[0.15]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1 md:gap-1.5 mt-6" role="tablist">
          {ENTRIES.map((_, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={active}
                aria-label={`Įrašas ${i + 1}`}
                onClick={() => goTo(i)}
                className="min-w-[36px] min-h-[44px] md:min-w-[44px] flex items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    active
                      ? "h-2 w-5 md:w-7 bg-text-on-dark-secondary/20 overflow-hidden"
                      : "h-2 w-2 bg-text-on-dark-secondary/15 hover:bg-text-on-dark-secondary/30"
                  }`}
                >
                  {active && shouldAutoAdvance && (
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ animation: `indicator-fill ${AUTO_MS}ms linear forwards` }}
                    />
                  )}
                  {active && !shouldAutoAdvance && (
                    <span className="block h-full w-full rounded-full bg-accent" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

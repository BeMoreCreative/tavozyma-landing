"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

/* ── Zone data ───────────────────────────────────────── */

const ZONES = [
  {
    id: "profile",
    label: "Profilis",
    description:
      "Tavo vardas, specialybė ir miestas. Klientai iš karto mato kas tu esi.",
  },
  {
    id: "stats",
    label: "Statistika",
    description:
      "Patirtis, darbų skaičius, patvirtinimai — visa statistika automatiškai.",
  },
  {
    id: "work_featured",
    label: "Darbas su patvirtinimu",
    description:
      "Kiekvienas darbas su data, vieta, įvertinimu ir kliento patvirtinimu.",
  },
  {
    id: "verification",
    label: "Kliento patvirtinimas",
    description:
      "Klientas patvirtina per Facebook, SMS arba el. paštą — tu nieko neturi daryti.",
  },
  {
    id: "work_history",
    label: "Darbų istorija",
    description:
      "Visa darbų istorija vienoje vietoje. Nekeičiama, kaip banko išrašas.",
  },
] as const;

type ZoneId = (typeof ZONES)[number]["id"];

/* ── TapZone ─────────────────────────────────────────── */

function TapZone({
  children,
  active,
  showDot,
  onClick,
  className = "",
}: {
  children: ReactNode;
  active: boolean;
  showDot: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className={`relative cursor-pointer rounded-xl transition-all duration-300 ${
        active
          ? "ring-2 ring-accent/60 ring-offset-1 ring-offset-white"
          : "hover:bg-black/[0.02]"
      } ${className}`}
    >
      {showDot && (
        <span className="absolute -top-1 -right-1 z-10 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </div>
  );
}

/* ── InfoPanel ───────────────────────────────────────── */

function InfoPanel({ zoneId }: { zoneId: ZoneId }) {
  const zone = ZONES.find((z) => z.id === zoneId)!;

  return (
    <div
      key={zoneId}
      className="info-panel-in glass rounded-2xl px-5 py-4 md:px-6 md:py-5"
    >
      <div className="h-[3px] -mt-4 md:-mt-5 mb-4 rounded-b-full bg-gradient-to-r from-transparent via-accent to-transparent" />
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
        {zone.label}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-text-on-dark/90">
        {zone.description}
      </p>
    </div>
  );
}

/* ── Main mockup ─────────────────────────────────────── */

export default function PhoneMockup() {
  const [activeZoneId, setActiveZoneId] = useState<ZoneId | null>(null);
  const tapped = useRef<Record<string, boolean>>({});
  const tracked = useRef<Record<string, boolean>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  const handleTap = useCallback(
    (zoneId: ZoneId) => {
      // Track analytics on first tap
      if (!tracked.current[zoneId]) {
        tracked.current[zoneId] = true;
        trackEvent("element_click", { element_id: `mockup_${zoneId}` });
      }

      tapped.current[zoneId] = true;

      // Toggle behavior: tap same zone to deselect
      if (activeZoneId === zoneId) {
        setActiveZoneId(null);
        if (timer.current) clearTimeout(timer.current);
        return;
      }

      setActiveZoneId(zoneId);

      // Scroll info panel into view on mobile
      setTimeout(() => {
        infoPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);

      // Auto-deselect after 6 seconds
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setActiveZoneId(null);
      }, 6000);
    },
    [activeZoneId],
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const showDot = (id: string) => !tapped.current[id] && activeZoneId !== id;

  return (
    <div className="mt-10 mx-auto flex flex-col items-center gap-6 max-w-sm">
      {/* Phone */}
      <div className="mx-auto">
        {/* Ambient glow */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-[3rem] bg-accent/[0.08] blur-2xl" />

          {/* Phone frame — gradient bezel */}
          <div className="relative w-[280px] md:w-[300px] rounded-[2.5rem] bg-gradient-to-b from-[#2A2A30] to-[#1A1A20] p-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.3),0_12px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(245,158,11,0.04)]">
            <div className="rounded-[calc(2.5rem-2px)] bg-white overflow-hidden">
              {/* Dynamic Island */}
              <div className="flex justify-center pt-2.5 pb-0.5">
                <div className="h-[22px] w-[90px] rounded-full bg-black" />
              </div>

              {/* Screen content */}
              <div className="px-4 pt-3 pb-4 space-y-2">
                {/* ── Profile ── */}
                <TapZone
                  active={activeZoneId === "profile"}
                  showDot={showDot("profile")}
                  onClick={() => handleTap("profile")}
                  className="-mx-1 px-1 py-1"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/avatar-tomas.jpg"
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="flex items-center gap-1.5 font-semibold text-gray-900 text-[15px]">
                        Tomas Kazlauskas
                        <svg
                          className="h-4 w-4 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </p>
                      <p className="text-xs text-gray-500">
                        Elektrikas &middot; Kaunas
                      </p>
                    </div>
                  </div>
                </TapZone>

                {/* ── Stats ── */}
                <TapZone
                  active={activeZoneId === "stats"}
                  showDot={showDot("stats")}
                  onClick={() => handleTap("stats")}
                  className="-mx-1 px-1 py-1.5"
                >
                  <div className="flex gap-1.5">
                    {["15+ m.", "520+ darbų", "83 patv."].map((stat) => (
                      <span
                        key={stat}
                        className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium text-gray-700"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </TapZone>

                {/* Section header (not tappable) */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="h-3.5 w-3.5 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      Atlikti darbai
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-400">
                    83 iš 83 patvirtinti
                  </span>
                </div>

                {/* ── Featured work ── */}
                <TapZone
                  active={activeZoneId === "work_featured"}
                  showDot={showDot("work_featured")}
                  onClick={() => handleTap("work_featured")}
                >
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm ring-1 ring-black/[0.03]">
                    <div className="flex items-start justify-between">
                      <p className="text-[13px] font-semibold text-gray-900">
                        Šildymo sistemos montavimas
                      </p>
                      <span className="shrink-0 text-[9px] text-gray-400">
                        2025-12
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          className="h-3 w-3 text-amber-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-[10px] text-gray-400">
                        Kaunas
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <svg
                        className="h-3 w-3 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[10px] text-gray-500">
                        Patvirtino: Rūta J. &middot;
                      </span>
                      <svg
                        className="h-3 w-3 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-medium text-green-700">
                        Patvirtintas darbas
                      </span>
                    </div>
                  </div>
                </TapZone>

                {/* ── Verification (SMS) ── */}
                <TapZone
                  active={activeZoneId === "verification"}
                  showDot={showDot("verification")}
                  onClick={() => handleTap("verification")}
                >
                  <div className="rounded-xl border border-gray-100 bg-white p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-[13px] font-medium text-gray-900">
                        Elektros instaliacijos atnaujinimas
                      </p>
                      <span className="shrink-0 text-[9px] text-gray-400">
                        2025-11
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <svg
                          key={i}
                          className="h-3 w-3 text-amber-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg
                        className="h-3 w-3 text-gray-200"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-[10px] text-gray-400">
                        Vilnius
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg
                        className="h-3 w-3 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[10px] text-gray-500">
                        Patvirtino: +370 6** ***12 &middot;
                      </span>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-700">
                        📱 SMS
                      </span>
                    </div>
                  </div>
                </TapZone>

                {/* ── Work history ── */}
                <TapZone
                  active={activeZoneId === "work_history"}
                  showDot={showDot("work_history")}
                  onClick={() => handleTap("work_history")}
                >
                  <div className="rounded-xl border border-gray-100 bg-white p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-[13px] font-medium text-gray-900">
                        Apšvietimo montavimas
                      </p>
                      <span className="shrink-0 text-[9px] text-gray-400">
                        2025-09
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg
                        className="h-3 w-3 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[10px] text-gray-500">
                        marius.st***@gmail.com &middot;
                      </span>
                      <span className="text-[10px] text-gray-400">✉️</span>
                    </div>
                  </div>
                </TapZone>
              </div>

              {/* Home indicator */}
              <div className="flex justify-center pb-2">
                <div className="h-1 w-28 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info panel + CTA */}
      <div ref={infoPanelRef} className="flex w-full flex-col gap-6">
        {activeZoneId ? (
          <InfoPanel zoneId={activeZoneId} />
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 px-5 py-4 md:px-6 md:py-5">
            <p className="text-sm text-text-on-dark-secondary text-center">
              Paspausk bet kurį elementą telefone
            </p>
          </div>
        )}

        <div className="text-center">
          <a
            href="#registracija"
            className="inline-block rounded-xl bg-accent px-8 py-4 text-base font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
          >
            Sukurk savo profilį
          </a>
        </div>
      </div>
    </div>
  );
}

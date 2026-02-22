"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { nunito } from "@/lib/fonts";

/* ─── Types ─── */

interface Step {
  number: string;
  title: string;
  subtitle: string;
  mockup: (props: { isActive: boolean; prefersReducedMotion: boolean }) => React.ReactNode;
}

/* ─── useCycleIndex Hook ─── */

function useCycleIndex(count: number, intervalMs: number, isActive: boolean, prefersReducedMotion: boolean): number {
  const [index, setIndex] = useState(0);
  useEffect(() => { if (isActive) setIndex(0); }, [isActive]);
  useEffect(() => {
    if (!isActive || prefersReducedMotion || count <= 1) return;
    const timer = setInterval(() => setIndex(prev => (prev + 1) % count), intervalMs);
    return () => clearInterval(timer);
  }, [isActive, prefersReducedMotion, count, intervalMs]);
  return index;
}

/* ─── Inline SVG Icons ─── */

function IconFacebook({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.018 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796v8.437C19.612 23.09 24 18.098 24 12.073z" />
    </svg>
  );
}

function IconPhone({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
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

function IconBell({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}

function IconChevronDown({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

/* ─── MockupFrame ─── */

function MockupFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[240px] md:w-[280px] lg:w-[320px] h-[380px] md:h-[420px] lg:h-[460px] rounded-3xl bg-white border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-black/[0.08]" />
          <div className="h-2 w-2 rounded-full bg-black/[0.08]" />
          <div className="h-2 w-2 rounded-full bg-black/[0.08]" />
        </div>
        <div className="h-1.5 w-10 rounded-full bg-black/[0.08]" />
      </div>
      {/* Content area */}
      <div className="flex-1 overflow-hidden px-4 pb-4">
        {children}
      </div>
    </div>
  );
}

/* ─── Step 01: Sukurkite profilį ─── */

const PROFILES = [
  { initials: "JP", name: "Jonas Petraitis", specialty: "Statybų meistras", city: "Vilnius", bio: "15 metų patirtis renovuojant butus ir namus", avatarGradient: "from-blue-400 to-blue-600" },
  { initials: "LK", name: "Laura Kazlauskienė", specialty: "Interjero dizainerė", city: "Kaunas", bio: "Modernus interjero dizainas privatiems ir komerciniams objektams", avatarGradient: "from-rose-400 to-rose-600" },
  { initials: "AR", name: "Andrius Rimkus", specialty: "Elektrikas", city: "Klaipėda", bio: "Elektros instaliacijos naujai statybai ir renovacijai", avatarGradient: "from-amber-400 to-amber-600" },
];

function MockupProfile({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) {
  const cycleIndex = useCycleIndex(PROFILES.length, 3500, isActive, prefersReducedMotion);
  const profile = PROFILES[cycleIndex];

  return (
    <MockupFrame>
      <div className="space-y-3 pt-2">
        <div key={cycleIndex} className="mockup-cycle-in flex items-center gap-3 rounded-xl border border-black/[0.06] bg-gray-50/80 p-4">
          <div key={`av-${cycleIndex}`} className={`avatar-pop flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${profile.avatarGradient} text-sm font-bold text-white shadow-sm`}>
            {profile.initials}
          </div>
          <div>
            <div className={`${nunito.className} text-sm font-bold text-gray-900`}>{profile.name}</div>
            <div key={`spec-${cycleIndex}`} className="text-shimmer text-xs font-medium text-gray-700">{profile.specialty}</div>
          </div>
        </div>
        {/* Profile fields */}
        <div key={`fields-${cycleIndex}`} className="mockup-cycle-in space-y-2.5 rounded-xl border border-black/[0.06] bg-gray-50/80 p-3" style={{ animationDelay: "50ms" }}>
          <div>
            <div className="text-[9px] font-medium text-gray-400 uppercase tracking-wider">Specializacija</div>
            <div className="text-[11px] text-gray-800 mt-0.5">{profile.specialty}</div>
          </div>
          <div>
            <div className="text-[9px] font-medium text-gray-400 uppercase tracking-wider">Miestas</div>
            <div className="text-[11px] text-gray-800 mt-0.5">{profile.city}</div>
          </div>
          <div>
            <div className="text-[9px] font-medium text-gray-400 uppercase tracking-wider">Apie</div>
            <div className="text-[11px] text-gray-800 mt-0.5 leading-relaxed">{profile.bio}</div>
          </div>
        </div>
        {/* Identity verified badge */}
        <div className="flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2">
          <svg className="h-3.5 w-3.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <div>
            <span className="text-[10px] font-medium text-accent">Tapatybė patvirtinta</span>
            <div className="flex items-center gap-1 mt-0.5">
              <svg className="h-2.5 w-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-[8px] text-gray-400">Saugus autentifikavimas</span>
            </div>
          </div>
        </div>
        {/* Private profile note */}
        <div className="flex items-center gap-2 rounded-lg border border-black/[0.06] bg-gray-50/80 px-3 py-1.5">
          <svg className="h-3 w-3 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
          <span className="text-[9px] text-gray-400">Profilis nėra viešai pasiekiamas</span>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─── Step 02: Įkelkite projektą ─── */

const PROJECTS = [
  { name: "Vonios renovacija — Vilnius", desc: "Pilna vonios kambario renovacija, plytelių klojimą...", email: "klientas@email.lt", smsProject: "Vonios renovacija", photoCount: 4, photoColors: ["bg-sky-100", "bg-sky-200", "bg-sky-50"] },
  { name: "Biuro interjeras — Kaunas", desc: "Atviros erdvės biuro pertvarkymas, baldai ir apšvietimas...", email: "info@imone.lt", smsProject: "Biuro interjeras", photoCount: 6, photoColors: ["bg-amber-100", "bg-amber-200", "bg-amber-50"] },
  { name: "Elektros instaliacija — Klaipėda", desc: "Pilna elektros instaliacija naujos statybos name, 180 m²...", email: "petras@namas.lt", smsProject: "Elektros instaliacija", photoCount: 3, photoColors: ["bg-emerald-100", "bg-emerald-200", "bg-emerald-50"] },
];

function MockupProject({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) {
  const cycleIndex = useCycleIndex(PROJECTS.length, 3000, isActive, prefersReducedMotion);
  const project = PROJECTS[cycleIndex];

  return (
    <div className="relative">
      <MockupFrame>
        <div className="space-y-3 pt-2">
          <div>
            <div className="text-[10px] font-medium text-gray-500 mb-1">Projekto pavadinimas</div>
            <div key={`name-${cycleIndex}`} className="mockup-cycle-in-fast rounded-lg border border-black/[0.06] bg-gray-50/80 px-3 py-2 text-xs text-gray-800">
              {project.name}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-medium text-gray-500 mb-1">Aprašymas</div>
            <div key={`desc-${cycleIndex}`} className="mockup-cycle-in-fast rounded-lg border border-black/[0.06] bg-gray-50/80 px-3 py-2 text-xs text-gray-500" style={{ animationDelay: "30ms" }}>
              {project.desc}
            </div>
          </div>
          {/* Photo attachments */}
          <div>
            <div className="text-[10px] font-medium text-gray-500 mb-1.5">Nuotraukos</div>
            <div key={`photos-${cycleIndex}`} className="mockup-cycle-in-fast flex gap-1.5" style={{ animationDelay: "45ms" }}>
              {project.photoColors.map((color, i) => (
                <div key={i} className={`${color} h-10 w-10 rounded-lg border border-black/[0.04] flex items-center justify-center`}>
                  <svg className="h-4 w-4 text-black/[0.15]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                </div>
              ))}
              {project.photoCount > 3 && (
                <div className="h-10 w-10 rounded-lg border border-black/[0.06] bg-gray-50 flex items-center justify-center">
                  <span className="text-[10px] font-medium text-gray-400">+{project.photoCount - 3}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-medium text-gray-500 mb-1">Kliento el. paštas</div>
            <div key={`email-${cycleIndex}`} className="mockup-cycle-in-fast rounded-lg border border-black/[0.06] bg-gray-50/80 px-3 py-2 text-xs text-gray-500" style={{ animationDelay: "60ms" }}>
              {project.email}
            </div>
          </div>
          {/* Contact method chips */}
          <div>
            <div className="text-[10px] font-medium text-gray-500 mb-1.5">Siųsti per:</div>
            <div className="flex gap-1.5">
              {[
                { icon: <IconPhone className="h-3 w-3" />, label: "SMS", active: true },
                { icon: <IconEmail className="h-3 w-3" />, label: "El. paštas", active: false },
              ].map((c) => (
                <div
                  key={c.label}
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-medium border ${
                    c.active
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-black/[0.06] bg-gray-50/80 text-gray-400"
                  }`}
                >
                  {c.icon}
                  {c.label}
                </div>
              ))}
            </div>
          </div>
          <button className="w-full rounded-xl bg-accent py-2.5 text-xs font-semibold text-white mt-1">
            Siųsti kvietimą
          </button>
          <div className="text-center text-[10px] text-gray-400">
            Užtrunka ~2 minutės
          </div>
        </div>
      </MockupFrame>
      {/* Floating SMS balloon — outside the card */}
      <div
        key={`sms-${cycleIndex}`}
        className="sms-balloon-in absolute z-10 w-[200px] md:w-[220px] lg:w-[240px] rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
        style={{ animationDelay: "200ms", bottom: "24px", right: "-20px" }}
      >
        {/* Chat bubble tail */}
        <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-black/[0.06] bg-white" />
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15">
            <IconPhone className="h-2.5 w-2.5 text-accent" />
          </div>
          <span className="text-[10px] font-bold text-text-on-light">tavozyma.lt</span>
        </div>
        <div className="text-[9px] text-gray-500 leading-relaxed">
          Sveiki! Jonas Petraitis prašo patvirtinti atliktą darbą &bdquo;{project.smsProject}&ldquo;. Patvirtinkite:{" "}
          <span className="text-accent font-medium">tavozyma.lt/p/a8x2k</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 03: Klientas patvirtina ─── */

function MockupConfirm() {
  const methods = [
    { name: "SMS žinutė", icon: <IconPhone className="h-3.5 w-3.5" />, brandColor: "text-accent", active: true },
    { name: "El. paštas", icon: <IconEmail className="h-3.5 w-3.5" />, brandColor: "text-accent", active: false },
    { name: "Facebook", icon: <IconFacebook className="h-3.5 w-3.5" />, brandColor: "text-[#1877F2]", active: false },
  ];

  return (
    <MockupFrame>
      <div className="space-y-2.5 pt-2">
        {/* Project context */}
        <div className="rounded-xl border border-black/[0.06] bg-gray-50/80 p-3">
          <div className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mb-1">Darbas</div>
          <div className={`${nunito.className} text-xs font-bold text-gray-900`}>Vonios renovacija</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Jonas Petraitis · Statybų meistras</div>
        </div>
        <div className="text-xs text-gray-600 font-medium">Patvirtinkite tapatybę:</div>
        {methods.map((m) => (
          <div
            key={m.name}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-xs transition-all ${
              m.active
                ? "border-accent/30 bg-accent/5 text-gray-900 font-medium"
                : "border-black/[0.06] bg-gray-50/80 text-gray-400"
            }`}
          >
            <div className={m.active ? m.brandColor : "text-gray-300"}>
              {m.icon}
            </div>
            {m.name}
            {m.active && (
              <span className="ml-auto flex items-center gap-1 text-[10px] text-accent">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Patvirtinta
              </span>
            )}
          </div>
        ))}
        <button className="w-full rounded-xl bg-accent py-2.5 text-xs font-semibold text-white">
          Patvirtinti
        </button>
        {/* 3-state legend */}
        <div className="flex items-center justify-center gap-3 pt-0.5">
          {[
            { label: "Patvirtinta", color: "bg-accent" },
            { label: "Laukiama", color: "bg-gray-300" },
            { label: "Atsisakyta", color: "bg-red-400/70" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1">
              <div className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
              <span className="text-[9px] text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
        {/* Reminder timeline */}
        <div className="flex items-center justify-between px-1 pt-1">
          {/* Kvietimas */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-accent">
              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </div>
            <span className="text-[8px] text-gray-400">Kvietimas</span>
          </div>
          {/* Connecting line */}
          <div className="h-px flex-1 bg-accent/30 mx-1" />
          {/* Priminimas */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/20">
              <IconBell className="h-2.5 w-2.5 text-accent" />
            </div>
            <span className="text-[8px] text-gray-400">2d</span>
          </div>
          {/* Connecting line */}
          <div className="h-px flex-1 bg-accent/30 mx-1" />
          {/* Patvirtinta */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-accent">
              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span className="text-[8px] text-gray-400">Patvirtinta</span>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─── Step 04: Profilis auga ─── */

function MockupGrowth() {
  const projects = [
    {
      name: "Vonios renovacija",
      desc: "Pilna renovacija, plytelės, santechnika",
      icon: <IconEmail className="h-3 w-3" />,
      iconColor: "text-accent",
      method: "El. paštas",
      client: "r***a@gmail.com",
      status: "confirmed" as const,
    },
    {
      name: "Terasos statyba",
      desc: "Medinė terasa su stogu, 25 m²",
      icon: <IconPhone className="h-3 w-3" />,
      iconColor: "text-accent",
      method: "SMS",
      client: "+3706****452",
      status: "pending" as const,
    },
  ];

  return (
    <MockupFrame>
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <span className={`${nunito.className} text-xs font-bold text-gray-900`}>Autentiškumas</span>
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
            Geras
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
            style={{ width: "75%" }}
          />
        </div>
        <div className="text-right text-[10px] font-medium text-accent">75%</div>
        <div className="space-y-2 pt-0.5">
          {projects.map((p) => (
            <div key={p.name} className={`rounded-lg border px-3 py-2.5 ${
              p.status === "confirmed"
                ? "border-accent/20 bg-accent/5"
                : "border-black/[0.06] bg-gray-50/80"
            }`}>
              <div className="flex items-start gap-2">
                {p.status === "confirmed" ? (
                  <svg className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5 shrink-0 text-gray-300 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-gray-800 truncate">{p.name}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5 truncate">{p.desc}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    {/* Verification badge */}
                    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-medium ${
                      p.status === "confirmed"
                        ? "bg-accent/10 text-accent"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      <span className={p.status === "confirmed" ? p.iconColor : "text-gray-300"}>{p.icon}</span>
                      {p.method}
                    </span>
                    {/* Client identity */}
                    <span className="text-[8px] text-gray-400/50 font-mono">{p.client}</span>
                  </div>
                  {/* Reminder badge for pending */}
                  {p.status === "pending" && (
                    <div className="flex items-center gap-1 mt-1.5 rounded-full bg-amber-500/10 px-1.5 py-0.5 w-fit">
                      <IconBell className="h-2.5 w-2.5 text-amber-500" />
                      <span className="text-[8px] font-medium text-amber-500">Priminimas išsiųstas</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─── Step 05: Dalinkitės nuoroda ─── */

const SHARE_PROFILES = [
  {
    initials: "JP",
    name: "Jonas Petraitis",
    specialty: "Statybų meistras",
    city: "Vilnius",
    avatarGradient: "from-blue-400 to-blue-600",
    trustPercent: 75,
    jobs: [
      { name: "Vonios renovacija", date: "2025-02", confirmed: true, method: "sms" as const, client: "+3706****452" },
      { name: "Terasos statyba", date: "2025-01", confirmed: false, method: "sms" as const, client: "+3705****891" },
      { name: "Virtuvės baldai", date: "2024-11", confirmed: true, method: "email" as const, client: "r***a@gmail.com" },
    ],
    extraJobs: 0,
  },
  {
    initials: "LK",
    name: "Laura Kazlauskienė",
    specialty: "Interjero dizainerė",
    city: "Kaunas",
    avatarGradient: "from-rose-400 to-rose-600",
    trustPercent: 90,
    jobs: [
      { name: "Biuro interjeras", date: "2025-02", confirmed: true, method: "email" as const, client: "info@i***.lt" },
      { name: "Kavos studija", date: "2025-01", confirmed: true, method: "sms" as const, client: "+3706****318" },
      { name: "Privatūs apartamentai", date: "2024-12", confirmed: true, method: "facebook" as const, client: "Tomas K." },
    ],
    extraJobs: 4,
  },
  {
    initials: "AR",
    name: "Andrius Rimkus",
    specialty: "Elektrikas",
    city: "Klaipėda",
    avatarGradient: "from-amber-400 to-amber-600",
    trustPercent: 95,
    jobs: [
      { name: "Namo instaliacija", date: "2025-02", confirmed: true, method: "sms" as const, client: "+3706****123" },
      { name: "Biuro renovacija", date: "2025-01", confirmed: true, method: "email" as const, client: "d***s@verslas.lt" },
      { name: "Pramoninis objektas", date: "2024-12", confirmed: true, method: "facebook" as const, client: "UAB Ener..." },
    ],
    extraJobs: 20,
  },
];

function MockupShare({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) {
  const cycleIndex = useCycleIndex(SHARE_PROFILES.length, 4000, isActive, prefersReducedMotion);
  const profile = SHARE_PROFILES[cycleIndex];

  return (
    <MockupFrame>
      <div className="space-y-3 pt-2">
        {/* ── Centered profile hero ── */}
        <div key={cycleIndex} className="mockup-cycle-in text-center">
          <div className="relative inline-flex items-center justify-center mb-2">
            <div key={`av5-${cycleIndex}`} className={`avatar-pop flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${profile.avatarGradient} text-xs font-bold text-white ring-2 ring-accent/20 shadow-sm`}>
              {profile.initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-2 ring-white">
              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>
          <div className={`${nunito.className} text-sm font-bold text-gray-900`}>{profile.name}</div>
          <div key={`spec5-${cycleIndex}`} className="text-shimmer text-xs font-medium text-gray-700 mt-0.5">{profile.specialty} · {profile.city}</div>
          <div className="mt-2 flex items-baseline justify-center gap-0.5">
            <span className="text-2xl font-bold text-accent leading-none">{profile.trustPercent}</span>
            <span className="text-xs font-semibold text-accent/60">%</span>
          </div>
        </div>

        {/* ── Work log with client verification ── */}
        <div>
          <div className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mb-2">Patvirtinti darbai</div>
          {profile.jobs.map((job, i) => (
            <div key={job.name} className="flex items-start gap-2.5 py-2" style={i < profile.jobs.length - 1 ? { borderBottom: "1px solid rgba(0,0,0,0.06)" } : undefined}>
              {job.confirmed ? (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 mt-0.5">
                  <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              ) : (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/[0.04] mt-0.5">
                  <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-gray-800 truncate">{job.name}</span>
                  <span className="text-[8px] text-accent shrink-0 cursor-pointer">plačiau</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={job.confirmed ? "text-accent" : "text-gray-300"}>
                    {job.method === "sms" && <IconPhone className="h-2.5 w-2.5" />}
                    {job.method === "email" && <IconEmail className="h-2.5 w-2.5" />}
                    {job.method === "facebook" && <IconFacebook className="h-2.5 w-2.5" />}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono truncate">{job.client}</span>
                  <span className="text-[8px] text-gray-300 shrink-0 tabular-nums ml-auto">{job.date}</span>
                </div>
              </div>
            </div>
          ))}
          {profile.extraJobs > 0 && (
            <div className="text-center pt-2 border-t border-black/[0.06] mt-1">
              <span className="text-[10px] text-accent font-medium">+{profile.extraJobs} darbų</span>
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <button className="w-full rounded-xl bg-accent py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          Peržiūrėti istoriją
        </button>
        {/* Security footer */}
        <div className="flex items-center justify-center gap-1.5">
          <svg className="h-2.5 w-2.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span className="text-[9px] text-gray-400">Patikrinta per <span className="text-accent font-medium">tavozyma.lt</span></span>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─── Steps data ─── */

const STEPS: Step[] = [
  {
    number: "01",
    title: "Sukurkite profilį",
    subtitle: "Privatus. Tik jūsų.",
    mockup: (props) => <MockupProfile {...props} />,
  },
  {
    number: "02",
    title: "Įkelkite projektą",
    subtitle: "2 minutės — ir viskas.",
    mockup: (props) => <MockupProject {...props} />,
  },
  {
    number: "03",
    title: "Klientas patvirtina",
    subtitle: "SMS, el. paštu arba per Facebook.",
    mockup: () => <MockupConfirm />,
  },
  {
    number: "04",
    title: "Profilis auga",
    subtitle: "Kiekvienas darbas skaičiuojasi.",
    mockup: () => <MockupGrowth />,
  },
  {
    number: "05",
    title: "Dalinkitės nuoroda",
    subtitle: "Klientas mato faktus, ne žodžius.",
    mockup: (props) => <MockupShare {...props} />,
  },
];

const AUTO_ADVANCE_MS = 5000;
const MANUAL_PAUSE_MS = 10000;
const SWIPE_THRESHOLD = 50;

/* ─── Step indicators ─── */

function StepIndicators({
  activeIndex,
  onSelect,
  running,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  running: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
      {STEPS.map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Žingsnis ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`relative h-2.5 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              isActive ? "w-8" : "w-2.5"
            }`}
          >
            {/* Visual dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-8 bg-text-on-dark-secondary/30"
                  : "h-2.5 w-2.5 bg-text-on-dark-secondary/20 hover:bg-text-on-dark-secondary/40"
              }`}
            >
              {isActive && running && (
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ animation: `indicator-fill ${AUTO_ADVANCE_MS}ms linear forwards` }}
                />
              )}
              {isActive && !running && (
                <span className="block h-full w-full rounded-full bg-accent" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main carousel component ─── */

export default function HowItWorksCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);

  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track viewport width with ResizeObserver
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // IntersectionObserver for auto-advance gating
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance
  const shouldAutoAdvance = isInView && !isHovering && !isPaused && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAutoAdvance) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [shouldAutoAdvance, activeIndex]);

  // Manual navigation — pauses auto-advance temporarily
  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setIsPaused(true);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => setIsPaused(false), MANUAL_PAUSE_MS);
    },
    []
  );

  // Cleanup pause timer
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goTo((activeIndex + 1) % STEPS.length);
      } else if (e.key === "ArrowLeft") {
        goTo((activeIndex - 1 + STEPS.length) % STEPS.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, goTo]);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      // Only handle horizontal swipes
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;

      if (dx < 0) {
        goTo(Math.min(activeIndex + 1, STEPS.length - 1));
      } else {
        goTo(Math.max(activeIndex - 1, 0));
      }
    },
    [activeIndex, goTo]
  );

  // Centering math
  const slideWidth = viewportWidth < 768 ? 240 : viewportWidth < 1024 ? 280 : 320;
  const gap = viewportWidth < 768 ? 16 : viewportWidth < 1024 ? 20 : 24;
  const trackOffset = viewportWidth > 0
    ? viewportWidth / 2 - activeIndex * (slideWidth + gap) - slideWidth / 2
    : 0;

  const hydrated = viewportWidth > 0;

  return (
    <section
      ref={sectionRef}
      className="bg-bg-secondary px-6 py-20 md:px-10 md:py-32 opacity-0 overflow-hidden"
      role="region"
      aria-label="Kaip tai veikia"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Kaip tai veikia
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-text-on-dark md:text-4xl">
            Penki žingsniai iki
            <br />
            patikimo profilio
          </h2>
          <p className="mt-4 text-base text-text-on-dark-secondary">
            Nuo registracijos iki patvirtinto portfolio — per kelias minutes.
          </p>
        </div>

        {/* Lead channels → one place */}
        <div className="mb-14">
          <p className="mb-4 text-center text-sm font-medium text-text-on-dark-secondary">
            Klientai ateina iš visur
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { name: "Instagram", color: "from-purple-500 to-pink-500", icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              { name: "Facebook", color: "from-blue-500 to-blue-600", icon: <IconFacebook className="h-4 w-4" /> },
              { name: "Darbų portalai", color: "from-emerald-500 to-teal-600", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg> },
              { name: "Rekomendacijos", color: "from-amber-500 to-orange-500", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg> },
            ].map((ch, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full border border-border-dark bg-bg-card/80 px-4 py-2.5">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${ch.color} text-white`}>
                  {ch.icon}
                </div>
                <span className="text-sm font-medium text-text-on-dark">{ch.name}</span>
              </div>
            ))}
          </div>
          {/* Arrow + message */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
            <p className="text-sm text-text-on-dark-secondary text-center">
              <span className={`${nunito.className} text-accent font-bold`}>TavoŽyma</span> — centralizuota vieta įrodyti patirtį.
            </p>
          </div>
        </div>

        {/* Active step label */}
        <div className="text-center mb-8" aria-live="polite">
          <span className="font-mono text-sm font-semibold text-accent">
            {STEPS[activeIndex].number}
          </span>
          <h3 className="mt-1 font-display text-xl font-semibold text-text-on-dark">
            {STEPS[activeIndex].title}
          </h3>
          <p className="mt-1 text-sm text-text-on-dark-secondary">
            {STEPS[activeIndex].subtitle}
          </p>
        </div>

        {/* Carousel viewport */}
        <div
          ref={viewportRef}
          className="overflow-x-hidden overflow-y-visible"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={`carousel-track flex ${!hydrated ? "opacity-0" : ""}`}
            style={{
              gap: `${gap}px`,
              transform: `translateX(${trackOffset}px)`,
            }}
          >
            {STEPS.map((step, i) => {
              const distance = Math.abs(i - activeIndex);
              const isActive = distance === 0;
              const isAdjacent = distance === 1;

              const scale = isActive ? 1 : isAdjacent ? 0.85 : 0.75;
              const opacity = isActive ? 1 : isAdjacent ? 0.5 : 0.2;
              // Skip blur on mobile for performance
              const blur = viewportWidth >= 768
                ? isActive ? 0 : isAdjacent ? 2 : 4
                : 0;

              return (
                <div
                  key={step.number}
                  className="carousel-slide shrink-0 cursor-pointer"
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : undefined,
                  }}
                  onClick={() => {
                    if (i !== activeIndex) goTo(i);
                  }}
                >
                  {step.mockup({ isActive: i === activeIndex, prefersReducedMotion })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <StepIndicators
          activeIndex={activeIndex}
          onSelect={goTo}
          running={shouldAutoAdvance}
        />
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BridgeQuestion({ question }: { question: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  return (
    <div
      ref={ref}
      className="bg-bg-primary px-6 py-16 md:py-20 opacity-0"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-block h-px w-8 bg-accent/40 mb-6" />
        <p className="font-display text-xl font-medium leading-relaxed tracking-tight text-text-on-dark-secondary md:text-2xl">
          {question}
        </p>
      </div>
    </div>
  );
}

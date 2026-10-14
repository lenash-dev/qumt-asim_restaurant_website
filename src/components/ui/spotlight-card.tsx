"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tarjeta con un halo dorado que sigue al cursor. */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={handlePointerMove} className={cn("group/spot relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgb(240 181 77 / 0.16), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}

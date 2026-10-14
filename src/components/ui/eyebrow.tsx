import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Rombo del separador del logo */
export function Diamond({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block size-1.5 shrink-0 rotate-45 bg-gold-400", className)} />;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.38em] text-cream-200", className)}>
      <Diamond />
      {children}
    </p>
  );
}

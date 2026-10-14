"use client";

import { AnimatePresence, motion } from "motion/react";
import { getOpenStatus, useRestaurantClock } from "@/lib/clock";
import { cn } from "@/lib/utils";

/** Píldora "Abierto / Cerrado" calculada con la hora del restaurante. */
export function OpenStatus({ className }: { className?: string }) {
  const clock = useRestaurantClock();
  const status = clock ? getOpenStatus(clock) : null;

  return (
    <span className={cn("glass inline-flex h-9 items-center gap-2.5 rounded-full px-4 text-xs font-semibold text-cream-100", className)}>
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />}
        <span className={cn("relative size-2 rounded-full transition-colors", status?.open ? "bg-emerald-400" : "bg-gold-400")} />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status?.label ?? "loading"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {status?.label ?? "Horario de hoy"}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

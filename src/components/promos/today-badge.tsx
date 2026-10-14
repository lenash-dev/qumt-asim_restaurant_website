"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRestaurantClock } from "@/lib/clock";
import { cn } from "@/lib/utils";

/** Etiqueta "Hoy" si la promoción aplica el día actual (hora del restaurante). */
export function TodayBadge({ days, className }: { days?: number[]; className?: string }) {
  const clock = useRestaurantClock();
  const applies = clock !== null && (!days || days.includes(clock.day));

  return (
    <AnimatePresence>
      {applies && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
          className={cn(
            "rounded-full bg-gold-400 px-3 py-1 text-[0.65rem] font-extrabold tracking-[0.2em] text-wine-900 uppercase shadow-[0_8px_20px_-6px_rgb(240_181_77/0.7)]",
            className,
          )}
        >
          Hoy
        </motion.span>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { promotions } from "@/content/promotions";
import { useRestaurantClock } from "@/lib/clock";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/motion/reveal";
import { PromoTicket } from "./promo-ticket";

type DayFilter = number | "all";

const shortDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const weekOrder = [1, 2, 3, 4, 5, 6, 0];

/** Promociones con filtro por día de la semana. */
export function PromotionsBoard() {
  const [day, setDay] = useState<DayFilter>("all");
  const clock = useRestaurantClock();
  const visible = promotions.filter((promo) => day === "all" || !promo.days || promo.days.includes(day));

  const filters: { id: DayFilter; label: string }[] = [
    { id: "all", label: "Todas" },
    ...weekOrder.map((d) => ({ id: d, label: shortDays[d] })),
  ];

  return (
    <section aria-label="Promociones" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
      <div role="tablist" aria-label="Filtrar por día" className="glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]">
        {filters.map((filter) => {
          const isActive = day === filter.id;
          const isToday = clock?.day === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setDay(filter.id)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                isActive ? "text-wine-900" : "text-cream-200/80 hover:text-cream-50",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="day-tab"
                  className="absolute inset-0 rounded-full bg-cream-50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                {filter.label}
                {isToday && <span className="size-1.5 rounded-full bg-gold-400" aria-label="(hoy)" />}
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((promo, index) => (
            <motion.li
              key={promo.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.06 }}
              className={cn(promo.highlight && "md:col-span-2 lg:col-span-2")}
            >
              <PromoTicket promo={promo} size={promo.highlight ? "lg" : "md"} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && <p className="mt-10 text-cream-300">No hay promociones para este día.</p>}
    </section>
  );
}

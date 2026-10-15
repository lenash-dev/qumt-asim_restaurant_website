"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import { useLenis } from "lenis/react";
import { Clock, Moon, Search, Sun, Sunrise, X, type LucideIcon } from "lucide-react";
import { mealServices, type MealService, type TodayMenu } from "@/content/menu";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { easeOutExpo } from "@/components/motion/reveal";
import { MenuItemCard } from "./dish-card";

const serviceIcons: Record<MealService, LucideIcon> = { desayuno: Sunrise, almuerzo: Sun, cena: Moon };

const container: Variants = {
  hidden: {},
  shown: { transition: { delayChildren: stagger(0.045) } },
  exit: { opacity: 0, y: 24, filter: "blur(6px)", transition: { duration: 0.28, ease: "easeIn" } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/** Menú de hoy por servicio, con las categorías que el restaurante habilitó para el día. */
export function DailyMenu({ menu }: { menu: TodayMenu }) {
  const available = mealServices.filter((s) => menu.services[s.id]);
  const [active, setActive] = useState<MealService>(
    menu.services.almuerzo ? "almuerzo" : (available[0]?.id ?? "almuerzo"),
  );
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const current = menu.services[active];
  const term = normalize(query.trim());
  const sections = useMemo(
    () =>
      (current?.sections ?? [])
        .map((section) => ({
          ...section,
          items: section.items.filter((dish) => !term || normalize(`${dish.name} ${dish.description}`).includes(term)),
        }))
        .filter((section) => section.items.length > 0),
    [current, term],
  );

  function selectService(id: MealService) {
    setActive(id);
    const results = resultsRef.current;
    if (results && results.getBoundingClientRect().top < 0) {
      if (lenis) lenis.scrollTo(results, { offset: -190 });
      else results.scrollIntoView({ behavior: "smooth" });
    }
  }

  const searchInput = (
    <label className="relative block sm:w-64">
      <span className="sr-only">Buscar en el menú</span>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-cream-300" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar un plato…"
        disabled={!current}
        className="h-11 w-full rounded-full bg-wine-950/50 pr-4 pl-11 text-sm text-cream-50 ring-1 ring-cream-50/10 outline-none placeholder:text-cream-300/70 focus:ring-2 focus:ring-gold-400/60 disabled:opacity-50"
      />
    </label>
  );

  return (
    <section aria-label="Menú de hoy" className="relative pb-16">
      <div className="mx-auto mb-3 max-w-7xl px-5 sm:hidden">{searchInput}</div>

      <div className="sticky top-[5.6rem] z-30 mx-auto max-w-7xl px-3 sm:top-24 sm:px-8">
        <div className="glass-strong flex items-center gap-2 rounded-full p-1.5">
          <div role="tablist" aria-label="Servicios" className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none]">
            {mealServices.map((service) => {
              const isActive = active === service.id;
              const isAvailable = Boolean(menu.services[service.id]);
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectService(service.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                    isActive ? "text-wine-900" : "text-cream-200/80 hover:text-cream-50",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-tab"
                      className="absolute inset-0 rounded-full bg-cream-50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative">{service.label}</span>
                  {!isAvailable && (
                    <span
                      className={cn(
                        "relative rounded-full px-1.5 py-0.5 text-[0.55rem] font-extrabold tracking-wider uppercase",
                        isActive ? "bg-wine-900/10 text-wine-700" : "bg-cream-50/10 text-cream-300",
                      )}
                    >
                      No disponible
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="hidden sm:block">{searchInput}</div>
        </div>
      </div>

      {/* Altura mínima: evita que la página "salte" al cambiar de servicio */}
      <div ref={resultsRef} className="mx-auto mt-14 min-h-[60svh] max-w-7xl px-5 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div key={active} variants={container} initial="hidden" animate="shown" exit="exit" className="space-y-20">
            {!current ? (
              <Unavailable service={active} alternatives={available.map((s) => s.id)} onSelect={selectService} />
            ) : (
              <>
                {current.notes && (
                  <motion.p variants={item} className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm text-cream-100">
                    <Clock className="size-4 text-gold-300" aria-hidden />
                    {current.notes}
                  </motion.p>
                )}

                {sections.map((section) => (
                  <section key={section.id} aria-labelledby={`seccion-${section.id}`}>
                    <motion.div
                      variants={item}
                      className="flex flex-col gap-4 border-b border-cream-50/10 pb-5 sm:flex-row sm:items-end sm:justify-between"
                    >
                      <div>
                        <h2 id={`seccion-${section.id}`} className="font-display text-4xl uppercase sm:text-5xl">
                          {section.name}
                        </h2>
                        {(section.note || section.description) && <p className="mt-1 max-w-xl text-cream-300">{section.note ?? section.description}</p>}
                      </div>
                      {section.price !== null && (
                        <p className="flex shrink-0 items-baseline gap-2 self-start rounded-full bg-gold-400 px-5 py-2 text-wine-900 sm:self-auto">
                          <span className="text-[0.65rem] font-extrabold tracking-[0.2em] uppercase">Combo</span>
                          <span className="font-display text-3xl leading-none">{formatPrice(section.price)}</span>
                        </p>
                      )}
                    </motion.div>

                    <ul className="mt-8 grid gap-4 md:grid-cols-2">
                      <AnimatePresence mode="popLayout">
                        {section.items.map((dish) => (
                          <motion.li
                            key={dish.id}
                            layout
                            variants={item}
                            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                          >
                            <MenuItemCard item={dish} />
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </section>
                ))}

                {sections.length === 0 && (
                  <motion.div variants={item} className="glass rounded-[2rem] px-6 py-16 text-center">
                    <p className="font-display text-3xl uppercase">Ese plato no está hoy</p>
                    <p className="mt-2 text-cream-300">No encontramos resultados para «{query}».</p>
                    <Button variant="glass" size="sm" className="mt-6" onClick={() => setQuery("")}>
                      <X className="size-4" aria-hidden />
                      Limpiar búsqueda
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Unavailable({
  service,
  alternatives,
  onSelect,
}: {
  service: MealService;
  alternatives: MealService[];
  onSelect: (id: MealService) => void;
}) {
  const Icon = serviceIcons[service];
  const label = mealServices.find((s) => s.id === service)!.label;
  return (
    <motion.div variants={item} className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-20 text-center sm:px-12">
      <div aria-hidden className="bg-andean absolute inset-0 opacity-[0.04]" />
      <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-cream-50/8 text-gold-300 ring-1 ring-cream-50/15">
        <Icon className="size-9" strokeWidth={1.4} aria-hidden />
      </span>
      <p className="relative mt-6 inline-block rounded-full bg-cream-50/10 px-3 py-1 text-[0.65rem] font-extrabold tracking-[0.25em] text-cream-200 uppercase">
        No disponible hoy
      </p>
      <p className="relative mt-4 font-display text-4xl uppercase sm:text-5xl">Hoy no servimos {label.toLowerCase()}</p>
      <p className="relative mx-auto mt-3 max-w-md text-cream-200/80">
        El menú cambia cada día. {alternatives.length > 0 ? "Mira lo que preparamos hoy:" : "Vuelve pronto o escríbenos para saber qué hay."}
      </p>
      {alternatives.length > 0 && (
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          {alternatives.map((id) => (
            <Button key={id} variant="solid" onClick={() => onSelect(id)}>
              Ver {mealServices.find((s) => s.id === id)!.label.toLowerCase()}
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
